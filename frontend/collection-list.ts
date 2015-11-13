/**
 * Created by fx on 07/11/15.
 */

import {
    Component,
    CORE_DIRECTIVES
} from 'angular2/angular2';

import { RouteParams } from 'angular2/router';

import { CollectionEntity } from './bean/collection-entity';

import { MongoService } from "./mongo-service";

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

    constructor(params:RouteParams, public service:MongoService) {
        console.log('Entering CollectionList constructor');
        this.dbName = params.get('id');

        service.collections(this.dbName)
            .then((collections:CollectionEntity[]) => {
                this.collections = collections;
            })
            .catch((msg:any) => {
                console.log('Cant get collections: ', msg);
            });
    }
}