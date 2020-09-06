import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Store } from '@ngrx/store';
import {ClearError} from "~/app/store/actions/auth.actions";

@Component({
    selector: 'ns-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
    public errorText: string = null;

    public errorTitle: string;

    public errorImageSrc: string;

    // #############################################

    constructor(private params: ModalDialogParams, private store: Store) {
        this.getRandomInt();
    }

    // #############################################

    ngOnInit(): void {
        this.errorText = this.params.context;
    }

    // #############################################

    public onClose(): void {
        this.store.dispatch(new ClearError());
        this.params.closeCallback(null);
    }

    // #############################################

    private getRandomInt(): void {
        const screenVariant = Math.floor(Math.random() * Math.floor(3));

        if(screenVariant === 0) {
            this.errorTitle = 'Упс. Ошибочка(';
            this.errorImageSrc = '~/app/assets/error1.png'
        } else if(screenVariant === 1) {
            this.errorTitle = 'AAA! Ошибочка(';
            this.errorImageSrc = '~/app/assets/error2.png'
        } else {
            this.errorTitle = 'Тьфу! Ошибка(';
            this.errorImageSrc = '~/app/assets/error3.png'
        }
    }

    // #############################################
}
