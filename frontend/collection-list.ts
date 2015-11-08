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
        <ul class="collection with-header">
        <li class="collection-header"><h3>Collections list for {{ dbName }}</h3></li>
            <li class="collection-item" *ng-for="#collection of collections">
                {{ collection.name }}
            </li>
        </ul>
    `,
    directives: [CORE_DIRECTIVES]
})
export class CollectionList {

    private dbName:string;
    private collections:CollectionEntity[];

    constructor(params:RouteParams) {
        console.log('Entering CollectionList constructor');
        this.dbName = params.get('id');

        this.collections = [];
        this.collections.push(new CollectionEntity('Col 1'))
        this.collections.push(new CollectionEntity('Col 2'))
        this.collections.push(new CollectionEntity('Col 3'))
    }
}