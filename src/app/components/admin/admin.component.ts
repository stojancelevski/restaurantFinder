import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Restaurant} from '../../models/restaurant';
import {ModalController} from '@ionic/angular';
import {ToastService} from '../../services/restaurant/toast.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
    restaurants: Restaurant[];

    constructor(private fireService: FirebaseService,
                private toast: ToastService,
                private modalCtrl: ModalController,
    ) {
    }

    ngOnInit() {
        this.fireService.getRestaurantList().subscribe(rest => {
            this.restaurants = rest.filter(val => val.approved === false);
        });
    }

    updateRestaurant(key) {
        console.log(key);
        this.fireService.updateRestaurant(key, {approved: true}).then(() => {
            this.toast.presentToast('Successfully Updated');
        });
    }

    deleteRestaurant(key) {
        this.fireService.deleteRestaurant(key).then(() => {
            this.toast.presentToast('Successfully Deleted');

        });
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            dismissed: true
        });
    }


}
