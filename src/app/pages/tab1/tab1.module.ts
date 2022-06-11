import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {AgmCoreModule} from '@agm/core';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: 'AIzaSyAqcsIHsLSSaDbGTQ_w3M2kTAV2SOets-g'
        }),
        RouterModule.forChild([{path: '', component: Tab1Page},
            {
                path: 'restaurant-details/:id',
                loadChildren: () => import('../restaurant-details/restaurant-details.module').then(m => m.RestaurantDetailsPageModule)
            }]),
        ReactiveFormsModule
    ],
    declarations: [Tab1Page]
})
export class Tab1PageModule {
}
