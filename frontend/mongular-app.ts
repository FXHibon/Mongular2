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
import { DbConnection } from './db-connection';
import { Toolbar } from './toolbar';
import { MongularFooter } from './mongular-footer';
import { MongoService } from './mongo-service';


@RouteConfig([
    {path: '/', component: DbConnection, as: 'DbConnection'},
    {path: '/db', component: DbList, as: 'DbList'},
    {path: '/db/:id', component: CollectionList, as: 'CollectionList'}
])

@Component({
    selector: 'mongular-app',
    template: `
        <toolbar></toolbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
        <mongular-footer></mongular-footer>
    `,
    directives: [ROUTER_DIRECTIVES, Toolbar, MongularFooter]
})
export class MongularApp {

    constructor(public service:MongoService) {
        console.log('Entering MongularApp constructor');
    }

}

let config = {
    apiEndpoint: 'http://localhost:3000/api'
};

bootstrap(MongularApp, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(MongoService, {useClass: MongoService}),
    provide('App.config', {useValue: config})
]);