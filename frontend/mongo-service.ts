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
    private _login:Login;

    constructor(@Inject('App.config') private  config:any) {
        console.log('Entering MongoService constructor');
        this._http = new SimpleHttp(this.config.apiEndpoint);
    }

    public dbs():Promise<DbEntity[]> {
        return this._http.getAll<DbEntity>('/dbs', DbEntity, this._login);
    }


    public collections(collectionName:string):Promise<CollectionEntity[]> {
        //noinspection TypeScriptValidateTypes
        return this._http.getAll<CollectionEntity>('/collections', CollectionEntity, this._login, {collectionName: collectionName});
    }

    public login(login:Login):Promise<any> {
        return this._http.post<any>('/login', login)
            .then(() => {
                this._login = login;
            });
    }

    get isConnected():boolean {
        return this._login != undefined && this._login != null;
    }
}