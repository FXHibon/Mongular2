/**
 * Created by fx on 07/11/15.
 */

import {
    Component,
    CORE_DIRECTIVES
} from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { DbEntity } from './bean/db-entity'
import { MongoService } from "./mongo-service";

@Component({
    selector: 'db-list',
    template: `
        <div class="collection with-header">
            <div class="collection-header"><h3>DBs list</h3></div>
            <a class="collection-item" *ng-for="#db of dbs" [router-link]="['CollectionList', {id: db.name}]">{{ db.name }}</a>
        </div>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class DbList {
    private dbs:DbEntity[] = [];

    constructor(public service:MongoService) {
        console.log('Entering DbList constructor');
        service.dbs().then((dbs:DbEntity[]) => {
                this.dbs = dbs;
            })
            .catch((data:any) => {
                console.log('Error: ', data);
            });
    }
}