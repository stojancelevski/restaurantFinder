import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AdminComponent } from '../../components/admin/admin.component';
import { ToastService } from '../../services/restaurant/toast.service';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    password = '12345678';

    constructor(private modalCtrl: ModalController, private toast: ToastService, private alertCtrl: AlertController,
                private androidFingerprintAuth: AndroidFingerprintAuth) {
    }

    async presentModal() {
        const modal = await this.modalCtrl.create({
            component: AdminComponent
        });
        return await modal.present();
    }

    async login() {
        const alert = await this.alertCtrl.create({
            header: 'Enter Password',
            inputs: [
                {
                    name: 'password',
                    type: 'password',
                    label: 'Password',
                    handler: (value) => {
                        return value;
                    },
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        if (data.password === this.password) {
                            this.presentModal();
                        } else {
                            this.toast.presentToast('Wrong password, try again!');
                        }
                    }
                }
            ]
        });

        await alert.present();
    }
}
