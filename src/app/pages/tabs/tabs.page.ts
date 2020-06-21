import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AdminComponent} from '../../components/admin/admin.component';
import {ToastService} from '../../services/restaurant/toast.service';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    constructor(private modalCtrl: ModalController, private toast: ToastService,
                private androidFingerprintAuth: AndroidFingerprintAuth) {
    }

    async presentModal() {
        const modal = await this.modalCtrl.create({
            component: AdminComponent
        });
        return await modal.present();
    }

    login() {
        this.androidFingerprintAuth.isAvailable()
            .then((result) => {
                if (result.isAvailable) {
                    // it is available
                    this.androidFingerprintAuth.encrypt({clientId: 'myAppName', username: 'myUsername', password: 'myPassword'})
                        // tslint:disable-next-line:no-shadowed-variable
                        .then(result => {
                            if (result.withFingerprint) {
                                this.presentModal();

                            } else if (result.withBackup) {
                                this.presentModal();
                            } else {
                                this.toast.presentToast('Didn\'t authenticate!');
                            }
                        })
                        .catch(error => {
                            if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                                this.toast.presentToast('Fingerprint authentication cancelled');
                            } else {
                                this.toast.presentToast(error);
                            }
                        });

                } else {
                    // fingerprint auth isn't available
                    this.toast.presentToast('Fingerprint Not Available!');
                }
            })
            .catch(error => this.toast.presentToast(error));
    }
}
