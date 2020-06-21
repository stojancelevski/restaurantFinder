import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {ToastService} from '../../services/restaurant/toast.service';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../services/firebase/firebase.service';

@Component({
    selector: 'app-restaurant-details',
    templateUrl: './restaurant-details.page.html',
    styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {
    restaurant: Restaurant;

    constructor(private rest: FirebaseService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.rest.getRestaurantById(id).then(rest => {
                this.restaurant = rest;
            });
        });
    }
}
