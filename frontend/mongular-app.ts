/**
 * Created by fx on 07/11/15.
 */

import {
    bootstrap,
    provide,
    Component
} from 'angular2/angular2';

import {
    ROUTER_DIRECTIVES,
    RouteConfig,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy,
    APP_BASE_HREF
} from 'angular2/router';

import { DbList } from './db-list';
import { CollectionList } from './collection-list';

@RouteConfig([
    {path: '/', component: DbList, as: 'DbList'},
    {path: '/:id', component: CollectionList, as: 'CollectionList'}
])

@Component({
    selector: 'mongular-app',
    template: `
        <h4>MongularApp</h4>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class MongularApp {
    constructor() {
        console.log('Entering MongularApp constructor');
    }

}

bootstrap(MongularApp, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'})
]);