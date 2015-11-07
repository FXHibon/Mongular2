/**
 * Created by fx on 07/11/15.
 */

import { Component } from 'angular2/angular2';

@Component({
    selector: 'db-list',
    template: `
        <h5>DbList</h5>
    `,
    directives: []
})
export class DbList {
    constructor() {
        console.log('Entering DbList constructor');
    }
}