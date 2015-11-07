/**
 * Created by fx on 07/11/15.
 */

import { Component } from 'angular2/angular2';

@Component({
    selector: 'collection-list',
    template: `
        <h6>CollectionList</h6>
    `,
    directives: []
})
export class CollectionList {
    constructor() {
        console.log('Entering CollectionList constructor');
    }
}