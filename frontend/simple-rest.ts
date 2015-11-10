/**
 * Created by fx on 10/11/15.
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
        console.log(this._apiEndpoint);
    }

    getOne(type:string, param:any = {}) {

        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open(this._words.GET, this._apiEndpoint + type, true);
            req.onload = (e) => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        // parse req.responseText
                        let data = {
                            msg: req.responseText || ''
                        };
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

            req.send(null);
        });
    }

}