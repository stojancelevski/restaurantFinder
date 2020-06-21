import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Menu} from '../../models/menu';
import {FirebaseService} from '../../services/firebase/firebase.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ToastController} from '@ionic/angular';
import {ToastService} from '../../services/restaurant/toast.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
    restaurantForm: FormGroup;
    latitude;
    longitude;

    constructor(private fb: FormBuilder, private router: Router,
                private camera: Camera, private toast: ToastService,
                private fireService: FirebaseService, private geolocation: Geolocation) {
    }

    ngOnInit(): void {
        this.restaurantForm = this.fb.group({
            name: ['', Validators.required],
            img: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            menu: this.fb.array([this.buildMenu()]),
            contact: ['', Validators.required],
            approved: false
        });
        this.geolocation.watchPosition().subscribe(val => {
            this.restaurantForm.patchValue({
                latitude: val.coords.latitude,
                longitude: val.coords.longitude
            });
        });
    }

    get menu(): FormArray {
        return this.restaurantForm.get('menu') as FormArray;
    }

    buildMenu(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required]
        });
    }

    takePicture() {
        const options: CameraOptions = {
            quality: 25,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options)
            .then((imageData) => {
                this.fireService.upload(imageData)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(value => {
                            this.toast.presentToast('Image Successfully Uploaded');
                            this.restaurantForm.patchValue({
                                img: value
                            });

                        });
                    });
            }, (err) => {
                // Handle error
                this.toast.presentToast('Please try again !');
            });

    }

    addItem(): void {
        this.menu.push(this.buildMenu());
    }

    deleteItem(id) {
        this.menu.removeAt(id);
    }

    submit() {
        this.fireService.createRestaurant(this.restaurantForm.value).then(() => {
            this.router.navigateByUrl('tabs/tab1');
            this.restaurantForm.reset();
        });
    }

}
