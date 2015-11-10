/**
 * Created by fx on 10/11/15.
 * A super simple rest client written in TypeScript
 */

/**
 * TODO: Externalize this module
 */
export class SimpleHttp {

    private _apiEndpoint:string;

    private _words = {
        GET: 'GET'
    };

    constructor(public apiEndpoint:string) {
        this._apiEndpoint = apiEndpoint;
        if (apiEndpoint.charAt(apiEndpoint.length - 1) == '/') {
            this._apiEndpoint = apiEndpoint.substr(0, apiEndpoint.length - 1);
        }
    }

    public getOne<T>(resource:string, type:{ new(): T ;}, param:any = {}):Promise<T> {

        return new Promise<T>((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open(this._words.GET, this._apiEndpoint + resource, true);
            req.onload = (e) => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        let data:T;
                        console.log('Parsing:', req.responseText);
                        data = this.json2entity<T>(JSON.parse(req.responseText || '{}'), type);
                        resolve(data);
                    } else {
                        let data = {
                            status: req.status,
                            statusText: req.statusText,
                            msg: req.responseText || ''
                        };
                        reject(data);
                    }
                }
            };

            req.send();
        });
    }

    public getAll<T>(resource:string, type:{ new(): T;}, param:any = {}):Promise<T[]> {
        let promise = new Promise<T[]>((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open(this._words.GET, this._apiEndpoint + resource, true);
            req.onload = (e) => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        let data:T[];
                        console.log('Parsing:', req.responseText);
                        data = this.json2entities<T[]>(JSON.parse(req.responseText || '[]'), type);
                        resolve(data);
                    } else {
                        let data = {
                            status: req.status,
                            statusText: req.statusText,
                            msg: req.responseText || ''
                        };
                        reject(data);
                    }
                }
            };

            req.send();
        });

        return promise;
    }

    /**
     * Try to create an T instance using json in parameter
     * @param json Json object to be parsed
     * @param type
     * @return T instance
     */
    private json2entity<T>(json:any, type:{new():T;}):T {
        let val:T = new type();
        for (let key in val) {
            if (val.hasOwnProperty(key) && json.hasOwnProperty(key)) {
                val[key] = json[key];
            }
        }

        return val;
    }

    /**
     * Try to map an array of json obj to an array of entities
     * @param json
     * @param type
     * @returns {T[]}
     */
    private json2entities<T>(json:any, type:{new(): T}):T[] {
        let val:T[] = [];

        json.forEach((item:string) => {
            console.log('item = ', item);
            val.push(this.json2entity(item, type));
        });

        return val;
    }
}