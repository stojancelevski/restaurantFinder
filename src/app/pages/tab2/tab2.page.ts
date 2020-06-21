import {Component} from '@angular/core';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    constructor(private emailComposer: EmailComposer) {
    }

    openEmail() {
        const email = {
            to: 'easymeal@gmail.com',
            subject: 'Contact US',
            body: '',
            isHtml: true
        };

// Send a text message using default options
        this.emailComposer.open(email);
    }
}
