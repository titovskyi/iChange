import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

const countriesJson = require('../../assets/countries').countriesJSON;

@Component({
    selector: 'ns-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
    public currentCountry: { country: string; short: string; full: string; prefix: string } = null;

    public countries: any = countriesJson;

    // #############################################

    constructor(private params: ModalDialogParams) {}

    // #############################################

    ngOnInit(): void {
        this.currentCountry = this.params.context;
    }

    // #############################################

    public onCountryTap(country): void {
        this.params.closeCallback(country);
    }

    public onClose(): void {
        this.params.closeCallback(null);
    }

    // #############################################
}
