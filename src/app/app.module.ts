import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HttpClientModule} from '@angular/common/http';
import {ToastService} from './services/restaurant/toast.service';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FirebaseService} from './services/firebase/firebase.service';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {Camera} from '@ionic-native/camera/ngx';
import {AdminComponent} from './components/admin/admin.component';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';


@NgModule({
    declarations: [
        AppComponent,
        AdminComponent
    ],
    entryComponents: [
        AdminComponent
    ],
    imports: [BrowserModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        IonicModule.forRoot(),
        AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        ToastService,
        EmailComposer,
        FirebaseService,
        Camera,
        AndroidFingerprintAuth,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
