import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Restaurant} from './models/restaurant';

@Injectable({
    providedIn: 'root'
})
export class RestaurantsService {

    constructor(private http: HttpClient) {
    }


    getRestaurants() {
        return this.http.get<Restaurant[]>('assets/restaurants.json');
    }
}
