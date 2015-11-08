/**
 * Created by fx on 08/11/15.
 */

import {
    Component
} from 'angular2/angular2';

@Component({
    selector: 'mongular-footer',
    template: `
        <footer class="page-footer green">
            <div class="footer-copyright grey-text text-lighten-4">
                <div class="container">© 2015 No Copyright<a class="right grey-text text-lighten-4" href="https://github.com/FXHibon">By FXHibon</a></div>
            </div>
        </footer>
    `,
    directives: []
})
export class MongularFooter {

    constructor() {
        console.log('Entering MongularFooter constructor');
    }
}