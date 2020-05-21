import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RestaurantsService} from '../restaurants.service';
import {Restaurant} from '../models/restaurant';
import {resolveSanitizationFn} from '@angular/compiler/src/render3/view/template';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    latitude: number;
    longitude: number;
    foodForm: FormGroup;
    restaurants: Restaurant[];
    clicked = false;
    filteredRestaurants: Restaurant[];

    constructor(private geolocation: Geolocation, private rest: RestaurantsService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.foodForm = this.fb.group({
            food: ['']
        });
        this.rest.getRestaurants().subscribe(rest => {
            this.restaurants = rest;
        });
        this.geolocation.getCurrentPosition().then(value => {
            this.latitude = value.coords.latitude;
            this.longitude = value.coords.longitude;

        });
    }

    searchFood() {
        this.clicked = true;
        this.filteredRestaurants = new Array(0);
        this.restaurants.forEach(restaurant => {
            restaurant.food.forEach(r => {
                const match = r.name.includes(this.foodForm.controls.food.value);
                if (match === true) {
                    if (!this.exists(this.filteredRestaurants, restaurant)) {
                        this.filteredRestaurants.push(restaurant);
                    }
                }
            });
        });
    }

    exists(restaurants: Restaurant[], rest: Restaurant): boolean {
        const match = restaurants.find(r => r.name === rest.name);

        if (match !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    clearSearch() {
        this.clicked = false;
        this.foodForm.reset();
    }

}
