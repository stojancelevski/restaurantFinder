import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Restaurant} from '../../models/restaurant';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastCtrl: ToastController) {
    }

    async presentToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        await toast.present();
    }
}
