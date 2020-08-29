import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import { MainWrapperComponent } from '~/app/shared/main-wrapper/main-wrapper.component';
import { CountryComponent } from '~/app/modals/country/country.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '~/app/store/reducers/app.resucers';
import { AuthEffects } from '~/app/store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoginComponent } from '~/app/screens/login/login.component';
import { ConfirmComponent } from '~/app/screens/confirm/confirm.component';
import { JwtInterceptor } from '~/app/helpers/jwt.interceptor';

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
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        ConfirmComponent,
        MainWrapperComponent,
        CountryComponent,
        ItemsComponent,
        ItemDetailComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    entryComponents: [CountryComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
