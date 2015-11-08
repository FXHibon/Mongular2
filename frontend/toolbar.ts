/**
 * Created by fx on 07/11/15.
 */

import { Component } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    selector: 'toolbar',
    template: `
        <nav class="green">
            <div class="nav-wrapper">
                <a href class="brand-logo left" [router-link]="['DbList']">Mongular</a>
                <ul class="right hide-on-med-and-down">
                    <li><a [router-link]="['DbConnection']"><i class="material-icons">settings</i></a></li>
                </ul>
            </div>
        </nav>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class Toolbar {

    constructor() {
    }
}