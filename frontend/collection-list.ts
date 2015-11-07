/**
 * Created by fx on 07/11/15.
 */

import { Component } from 'angular2/angular2';

import { RouteParams } from 'angular2/router';

@Component({
    selector: 'collection-list',
    template: `
        <h6>CollectionList for {{ dbName }}</h6>
    `,
    directives: []
})
export class CollectionList {

    dbName:string;

    constructor(params:RouteParams) {
        console.log('Entering CollectionList constructor');
        this.dbName = params.get('id');
    }
}