import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Page } from 'tns-core-modules/ui/page';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { CountryComponent } from '~/app/modals/country/country.component';
import { AppStateInterface } from '~/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { LogIn } from '~/app/store/actions/auth.actions';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

    constructor(
        private page: Page,
        private router: Router,
        private modal: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private store: Store<AppStateInterface>
    ) {}

    // #############################################

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.androidStatusBarBackground = '#424855';
    }

    // #############################################

    public login(): void {
        if (this.countryPrefix.valid && this.phoneInput.valid) {
            const fullPhoneNumber = `${this.currentCountry.prefix}${this.phoneInput.value}`;

            // this.userService.login(fullPhoneNumber).subscribe((response: number) => {
            //     this.router.navigate(['confirm', { userPhone: fullPhoneNumber, userCode: response }]);
            // });

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
