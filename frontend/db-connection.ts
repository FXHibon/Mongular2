/**
 * Created by fx on 07/11/15.
 */

import {
    Component,
    FORM_DIRECTIVES
} from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    selector: 'db-connection',
    templateUrl: 'dist/db-connection.html',
    directives: [FORM_DIRECTIVES]
})
export class DbConnection {

    private baseUrl:string;
    private basePort:string;

    constructor() {
        console.log('Entering DbConnection constructor');
    }

    submit() {
        console.log({url: this.baseUrl, port: this.basePort}, ' submitted!')
    }
}