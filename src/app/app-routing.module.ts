import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import {AuthGuardService} from "~/app/services/auth-guard.service";
import {MainWrapperComponent} from "~/app/shared/main-wrapper/main-wrapper.component";
import {LoginComponent} from "~/app/screens/login/login.component";
import {ConfirmComponent} from "~/app/screens/confirm/confirm.component";

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainWrapperComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'confirm', component: ConfirmComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
