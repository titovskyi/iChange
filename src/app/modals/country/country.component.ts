import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { HttpClient } from '@angular/common/http';


const countriesJson = require('../../assets/countries').countriesJSON;

@Component({
    selector: 'ns-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css']
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

    public onCountryTap(country) {
        this.params.closeCallback(country);
    }

    public onClose() {
        this.params.closeCallback(null);
    }

    // #############################################
}
