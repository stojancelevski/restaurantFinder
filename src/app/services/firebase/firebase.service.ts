import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Restaurant} from '../../models/restaurant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    restaurant = firebase.database().ref('/restaurants');
    restaurantRef: AngularFireList<Restaurant> = null;
    restaurantUrl = '/restaurants';

    constructor(private fire: AngularFireDatabase) {
        this.restaurantRef = fire.list(this.restaurantUrl);
    }


    createRestaurant(value: Restaurant): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.restaurantRef.push(value).then(value1 =>
                resolve(value1.key)
            ).catch(err => {
                reject(err);
            })
            ;
        });
    }


    getRestaurantById(id): Promise<Restaurant> {
        return new Promise((resolve, reject) => {
            this.restaurant.child(id).once('value', snapshot => {
                resolve(snapshot.val());
            });
        });
    }

    getRestaurant() {
        return this.restaurantRef;
    }

    getRestaurantList(): Observable<Restaurant[]> {
        return this.getRestaurant().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                    ( { key: c.payload.key, ...c.payload.val() } )
                )
            )
        );
    }
    updateRestaurant(key: string, value: any) {
        return this.restaurantRef.update(key, value);
    }

    deleteRestaurant(key: string): Promise<any> {
        return this.restaurantRef.remove(key);
    }

    upload(captureDataUrl) {
        const storageRef = firebase.storage().ref();
        // Create a timestamp as filename

        const filename = Math.floor(Date.now() / 1000);

        // Create a reference to 'images/todays-date.jpg'

        const imageRef = storageRef.child(`images/${filename}.jpg`);

        const metadata = {
            contentType: 'image/jpeg'
        };

        return imageRef.putString(captureDataUrl, firebase.storage.StringFormat.BASE64, metadata);
    }
}

