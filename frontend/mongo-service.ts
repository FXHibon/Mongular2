/**
 * Created by fx on 09/11/15.
 */

import {
    Component,
    Injectable,
    Inject
} from 'angular2/angular2';
import { Http } from 'angular2/http';
import { DbEntity } from "./bean/db-entity";

@Injectable()
export class MongoService {

    private _dbs:DbEntity[];

    constructor(@Inject('App.config') public  config:any, @Inject(Http) http:Http) {
        console.log('Entering MongoService constructor');
        this.fetchData();
    }

    private fetchData() {
        this._dbs = [];
        this._dbs.push(new DbEntity("Db1"));
        this._dbs.push(new DbEntity("Db3"));
        this._dbs.push(new DbEntity("Db4"));
        this._dbs.push(new DbEntity("Db5"));
        console.log('Fetching data with config:', this.config);
    }

    get dbs():DbEntity[] {
        return this._dbs;
    }
}