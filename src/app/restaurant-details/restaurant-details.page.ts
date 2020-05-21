import {Component, OnInit} from '@angular/core';
import {Restaurant} from '../models/restaurant';
import {RestaurantsService} from '../restaurants.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-restaurant-details',
    templateUrl: './restaurant-details.page.html',
    styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {
    restaurant: Restaurant;

    constructor(private rest: RestaurantsService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.rest.getRestaurants().subscribe(rest => {
                this.restaurant = rest.find(r => r.id === id);
            });
        });

    }

}
