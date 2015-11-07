/**
 * Created by fx on 07/11/15.
 */

import { Component } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    selector: 'db-connection',
    template: `
        <div class="row">
            <form class="col m6">
                    <div class="row">
                        <div class="input-field">
                            <input id="baseUrl" type="url" class="validate">
                            <label for="baseUrl">MongoDb url</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field">
                            <input id="basePort" type="number" class="validate">
                            <label for="baseUrl">MongoDb port</label>
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
            </form>
        </div>
    `,
    directives: []
})
export class DbConnection {

    constructor() {
    }
}