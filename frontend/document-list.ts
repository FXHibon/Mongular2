/**
 * Created by fx on 15/11/15.
 */

import {
    Component,
    CORE_DIRECTIVES
} from 'angular2/angular2';
import { RouteParams } from 'angular2/router';
import { MongoService } from './mongo-service';
import { DocumentEntity } from './bean/document-entity';


@Component({
    selector: 'document-list',
    template: `
    <ul class="collection with-header">
        <li class="collection-header"><h3>Documents list for {{ dbName + '.' + collectionName }}</h3></li>
            <li class="collection-item" *ng-for="#doc of documents">
                {{ doc.data | json}}
            </li>
        </ul>`,
    directives: [CORE_DIRECTIVES]
})
export class DocumentList {

    private documents:DocumentEntity[];
    private dbName:string;
    private collectionName:string;

    constructor(public service:MongoService, params:RouteParams) {
        console.log('Entering DocumentList constructor');
        this.dbName = params.get('id');
        this.collectionName = params.get('collectionName');
        service.documents(this.dbName, this.collectionName)
            .then((docs:DocumentEntity[]) => {
                this.documents = docs;
            })
            .catch((msg:any) => {
                console.log('Cant get docs: ', msg);
            });
    }
}