import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';

import { Page } from 'tns-core-modules/ui/page';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { CountryComponent } from '~/app/modals/country/country.component';
import { AppStateInterface } from '~/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import {ClearError, LogIn} from '~/app/store/actions/auth.actions';
import {Actions} from "@ngrx/effects";
import { selectAuthError } from '~/app/store/selectors/errors.selector';
import {ErrorComponent} from "~/app/modals/error/error.component";
import {takeUntil} from "rxjs/internal/operators";
import {Subject, Subscription} from 'rxjs';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    public phoneInput: FormControl = new FormControl('957838869', [Validators.required, Validators.minLength(9)]);

    public countryPrefix: FormControl = new FormControl('UA (+380)', [Validators.required]);

    public currentCountry: {
        country: string;
        short: string;
        full: string;
        prefix: string;
    } = {
        country: 'ukraine',
        short: 'UA (+380)',
        full: 'Украина (+380)',
        prefix: '+380'
    };

    // #############################################

    private subscription: Subscription;

    private error: string = null;

    // #############################################

    constructor(
        private page: Page,
        private modal: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private store: Store<AppStateInterface>
    ) {
        this.subscription = this.store.pipe(select(selectAuthError)).subscribe((response) => {
            if(response) {
                const options: ModalDialogOptions = {
                    context: response,
                    viewContainerRef: this.viewContainerRef,
                    fullscreen: true
                };

                this.modal.showModal(ErrorComponent, options)
            }
        })
    }

    // #############################################

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.androidStatusBarBackground = '#424855';
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    // #############################################

    public login(): void {
        if (this.countryPrefix.valid && this.phoneInput.valid) {
            const fullPhoneNumber = `${this.currentCountry.prefix}${this.phoneInput.value}`;

            this.store.dispatch(new LogIn(fullPhoneNumber));
        }
    }

    public onChoseCountry() {
        const options: ModalDialogOptions = {
            context: this.currentCountry,
            viewContainerRef: this.viewContainerRef,
            fullscreen: true
        };

        this.modal.showModal(CountryComponent, options).then((res) => {
            if (res) {
                this.currentCountry = res;
                this.countryPrefix.setValue(res.short);
            }
        });
    }

    // #############################################
}
