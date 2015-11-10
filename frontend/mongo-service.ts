/**
 * Created by fx on 09/11/15.
 */

import {
    Component,
    Injectable,
    Inject
} from 'angular2/angular2';
import { DbEntity } from "./bean/db-entity";
import { CollectionEntity } from "./bean/collection-entity";
import { SimpleHttp } from "./simple-rest";

@Injectable()
export class MongoService {

    private _dbs:DbEntity[];
    private _collections:CollectionEntity[];
    private _http:SimpleHttp;

    constructor(@Inject('App.config') public  config:any) {
        console.log('Entering MongoService constructor');
        this._http = new SimpleHttp(this.config.apiEndpoint);
        this.fetchData();
    }

    private fetchData() {
        this._dbs = [];
        this._dbs.push(new DbEntity("Db1"));
        this._dbs.push(new DbEntity("Db3"));
        this._dbs.push(new DbEntity("Db4"));
        this._dbs.push(new DbEntity("Db5"));
        console.log('Fetching data with config:', this.config);

        this._http.getAll<DbEntity>('/test', DbEntity)
            .then(function (data) {
                console.log('200, received ', data);
            })
            .catch(function (data) {
                console.log(data.status + ', received ', data);
            });
    }

    get dbs():DbEntity[] {
        return this._dbs;
    }


    get collections():CollectionEntity[] {
        return this._collections;
    }
}