/**
 * Created by fx on 07/11/15.
 */

import {
    Component,
    CORE_DIRECTIVES
} from 'angular2/angular2';

import { RouteParams } from 'angular2/router';

import { CollectionEntity } from './bean/collection-entity';

@Component({
    selector: 'collection-list',
    template: `
        <h6>CollectionList for {{ dbName }}</h6>
        <ul class="collection">
            <li class="collection-item" *ng-for="#collection of collections">
            {{ collection.name }}
            </li>
        </ul>
    `,
    directives: [CORE_DIRECTIVES]
})
export class CollectionList {

    dbName:string;
    collections:CollectionEntity[];

    constructor(params:RouteParams) {
        console.log('Entering CollectionList constructor');
        this.dbName = params.get('id');

        this.collections = [];
        this.collections.push(new CollectionEntity('Col 1'))
        this.collections.push(new CollectionEntity('Col 2'))
        this.collections.push(new CollectionEntity('Col 3'))
    }
}