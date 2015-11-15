/**
 * Created by fx on 07/11/15.
 */

import {
    Component,
    CORE_DIRECTIVES
} from 'angular2/angular2';

import {
    RouteParams,
    ROUTER_DIRECTIVES
} from 'angular2/router';

import { CollectionEntity } from './bean/collection-entity';

import { MongoService } from "./mongo-service";

@Component({
    selector: 'collection-list',
    template: `
        <ul class="collection with-header">
        <div class="collection-header"><h3>Collections list for {{ dbName }}</h3></div>
            <a class="collection-item" *ng-for="#collection of collections" [router-link]="['DocumentList', {id: dbName, collectionName: 'colTest'}]">
                {{ collection.name }}
            </a>
        </ul>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
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