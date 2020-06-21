import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastService} from '../../services/restaurant/toast.service';
import {Restaurant} from '../../models/restaurant';
import {resolveSanitizationFn} from '@angular/compiler/src/render3/view/template';
import {FirebaseService} from '../../services/firebase/firebase.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    latitude: number;
    longitude: number;
    restaurants: Restaurant[];


    constructor(private geolocation: Geolocation, private rest: FirebaseService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.rest.getRestaurantList().subscribe(rest => {
            this.restaurants = rest.filter(val => val.approved === true);
        });
        this.geolocation.getCurrentPosition().then(value => {
            this.latitude = parseFloat(String(value.coords.latitude));
            this.longitude = parseFloat(String(value.coords.longitude));
        });
    }

}
