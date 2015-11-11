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
import { Login } from './bean/login';

@Injectable()
export class MongoService {

    private _http:SimpleHttp;

    constructor(@Inject('App.config') private  config:any) {
        console.log('Entering MongoService constructor');
        this._http = new SimpleHttp(this.config.apiEndpoint);
    }

    get dbs():Promise<DbEntity[]> {
        return this._http.getAll<DbEntity>('/dbs', DbEntity);
    }


    get collections():Promise<CollectionEntity[]> {
        return this._http.getAll<CollectionEntity>('/collections', CollectionEntity);
    }

    public login(login:Login):Promise<any> {
        return this._http.post<any>('/login', login);
    }
}