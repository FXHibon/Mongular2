/**
 * Created by fx on 07/11/15.
 */

import {
    Component,
    CORE_DIRECTIVES
} from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { DbEntity } from './bean/db-entity'

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
    private dbs:DbEntity[];

    constructor() {
        console.log('Entering DbList constructor');
        this.dbs = [];
        this.dbs.push(new DbEntity("Db1"));
        this.dbs.push(new DbEntity("Db3"));
        this.dbs.push(new DbEntity("Db4"));
        this.dbs.push(new DbEntity("Db5"));
    }
}