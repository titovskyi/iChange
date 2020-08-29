import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Page } from 'tns-core-modules/ui/page';
import { setString, getString } from 'tns-core-modules/application-settings/application-settings';
import { AppStateInterface } from '~/app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { Confirm } from '~/app/store/actions/auth.actions';
import { selectAuthCode } from '~/app/store/selectors/user.selector';

// import { UserService } from '../../../models/user/user.service';

@Component({
    selector: 'ns-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
    public phone: string = null;
    public confirmCode: FormControl = new FormControl('');

    // #############################################

    public activeInputs: boolean[] = [false, false, false, false, false];

    // #############################################

    public codeForm: FormGroup;

    public firstNumber: FormControl = new FormControl('');
    public secondNumber: FormControl = new FormControl('');
    public thirdNumber: FormControl = new FormControl('');
    public fourthNumber: FormControl = new FormControl('');
    public fifthNumber: FormControl = new FormControl('');

    // #############################################

    @ViewChild('firstFocus', { static: false }) public firstFocus: ElementRef;
    @ViewChild('secondFocus', { static: false }) public secondFocus: ElementRef;
    @ViewChild('thirdFocus', { static: false }) public thirdFocus: ElementRef;
    @ViewChild('fourthFocus', { static: false }) public fourthFocus: ElementRef;
    @ViewChild('fifthFocus', { static: false }) public fifthFocus: ElementRef;

    // #############################################

    constructor(
        private page: Page,
        private activatedRoute: ActivatedRoute,
        // private userService: UserService,
        private router: Router,
        private store: Store<AppStateInterface>
    ) {
        this.activatedRoute.paramMap.subscribe((response) => {
            this.phone = response.get('phone');
        });
        this.store.pipe(select(selectAuthCode)).subscribe((res) => {
            this.confirmCode.setValue(res);
        });
    }

    // #############################################

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.androidStatusBarBackground = '#424855';

        this.codeForm = new FormGroup({
            first: this.firstNumber,
            second: this.secondNumber,
            third: this.thirdNumber,
            fourth: this.fourthNumber,
            fifth: this.fifthNumber
        });

        setTimeout(() => {
            this.firstFocus.nativeElement.focus();
        }, 0);

        this.inputsSubscription();
    }

    // #############################################

    public onFocus(index: number) {
        this.activeInputs[index] = true;
    }

    public onBlur(index: number) {
        this.activeInputs[index] = false;
    }

    // #############################################

    public onGetCodeTap() {
        // this.userService.login(this.phone).subscribe(() => {});
    }

    public confirm(): void {
        if (this.formValid) {
            const confirmCode = `${this.firstNumber.value}${this.secondNumber.value}${this.thirdNumber.value}${this.fourthNumber.value}${this.fifthNumber.value}`;

            // this.userService.confirmUser(this.phone, this.confirmCode.value).subscribe((response) => {
            //     setString('myChangeAccessToken', response.token);
            //     this.router.navigate(['main']);
            // });

            this.store.dispatch(new Confirm({ phone: this.phone, confirmCode: this.confirmCode.value }));
        }
    }

    public doneTap(args) {
        const myTextField = args.object;
        myTextField.dismissSoftInput();
    }

    public formValid() {
        return (
            this.firstNumber.value &&
            this.secondNumber.value &&
            this.thirdNumber.value &&
            this.fourthNumber.value &&
            this.fifthNumber.value
        );
    }

    // #############################################

    private inputsSubscription() {
        this.firstNumber.valueChanges.subscribe((res) => {
            // console.log(res);
            if (res) {
                let checkValue: any = parseFloat(res);

                if (isNaN(checkValue)) {
                    this.firstNumber.reset();
                } else {
                    this.onFocus(1);
                    this.secondFocus.nativeElement.focus();
                }
            }
        });

        this.secondNumber.valueChanges.subscribe((res) => {
            if (res) {
                let checkValue: any = parseFloat(res);

                if (isNaN(checkValue)) {
                    this.secondNumber.reset();
                } else {
                    this.onFocus(2);
                    this.thirdFocus.nativeElement.focus();
                }
            }
        });

        this.thirdNumber.valueChanges.subscribe((res) => {
            if (res) {
                let checkValue: any = parseFloat(res);

                if (isNaN(checkValue)) {
                    this.thirdNumber.reset();
                } else {
                    this.onFocus(3);
                    this.fourthFocus.nativeElement.focus();
                }
            }
        });

        this.fourthNumber.valueChanges.subscribe((res) => {
            if (res) {
                let checkValue: any = parseFloat(res);

                if (isNaN(checkValue)) {
                    this.fourthNumber.reset();
                } else {
                    this.onFocus(4);
                    this.fifthFocus.nativeElement.focus();
                }
            }
        });

        this.fifthNumber.valueChanges.subscribe((res) => {
            if (res) {
                let checkValue: any = parseFloat(res);

                if (isNaN(checkValue)) {
                    this.fifthNumber.reset();
                } else {
                    this.onFocus(0);
                    this.firstFocus.nativeElement.focus();
                }
            }
        });
    }

    // #############################################
}
