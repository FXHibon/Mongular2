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
    template: `
        <div class="row">
            <form class="col m6" #connect-form="form" (ng-submit)="submit()">
                    <div class="row">
                        <div class="input-field">
                            <input id="baseUrl" type="text" class="validate" [(ng-model)]="baseUrl" required ng-control="url-control" #url-control="form">
                            <label for="baseUrl">MongoDb url</label>
                            <div [hidden]="urlControl.valid || urlControl.pristine">
                                Field is mandatory
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <input id="basePort" type="number" class="validate" [(ng-model)]="basePort" required ng-control="port-control" #port-control="form">
                            <label for="baseUrl">MongoDb port</label>
                            <div [hidden]="portControl.valid || portControl.pristine">
                                Field invalid
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn waves-effect waves-light" type="submit" name="action" [disabled]="!connectForm.form.valid">
                            Connect me
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
            </form>
        </div>
    `,
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