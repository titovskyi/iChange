import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainWrapperComponent } from '~/app/shared/main-wrapper/main-wrapper.component';
import { CountryComponent } from '~/app/modals/country/country.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '~/app/store/reducers/app.reducers';
import { AuthEffects } from '~/app/store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoginComponent } from '~/app/screens/login/login.component';
import { ConfirmComponent } from '~/app/screens/confirm/confirm.component';
import { JwtInterceptor } from '~/app/helpers/jwt.interceptor';
import { HomeComponent } from './screens/home/home.component';
import { SearchComponent } from './screens/search/search.component';
import { ChatComponent } from './screens/chat/chat.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { CreatePostComponent } from './screens/create-post/create-post.component';

import { TNSFrescoModule } from 'nativescript-fresco/angular';
import * as frescoModule from 'nativescript-fresco';
import * as applicationModule from 'tns-core-modules/application';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import {TNSFontIconModule} from "nativescript-ngx-fonticon";
import { ErrorComponent } from './modals/error/error.component';


if (applicationModule.android) {
    applicationModule.on('launch', () => {
        frescoModule.initialize();
    });
}
@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([AuthEffects]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        TNSFrescoModule,
        NativeScriptUIListViewModule,
        TNSFontIconModule.forRoot({ mdi: require("~/app/assets/css/material-design-icons.css") })
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        ConfirmComponent,
        MainWrapperComponent,
        CountryComponent,
        ErrorComponent,
        HomeComponent,
        SearchComponent,
        ChatComponent,
        ProfileComponent,
        CreatePostComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    entryComponents: [CountryComponent, ErrorComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
