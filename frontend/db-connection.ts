/**
 * Created by fx on 07/11/15.
 */

import {
    Component,
    FORM_DIRECTIVES
} from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { MongoService } from './mongo-service';
import { Login } from './bean/login';

@Component({
    selector: 'db-connection',
    templateUrl: 'db-connection.html',
    directives: [FORM_DIRECTIVES]
})
export class DbConnection {

    private baseUrl:string;
    private basePort:string;
    private submitted:boolean;

    constructor(private service:MongoService) {
        console.log('Entering DbConnection constructor');
        this.submitted = false;
    }

    submit() {
        if (!this.submitted) {
            this.submitted = true;
            console.log({url: this.baseUrl, port: this.basePort}, ' submitted!')
            this.service.login(new Login(this.baseUrl, this.basePort))
                .then((msg) => {
                    console.log('Ok, now connected');
                })
                .catch((msg) => {
                    console.log('Not connected: ' + JSON.stringify(msg))
                })
                .then(() => {
                    this.submitted = false;
                });
        }
    }
}