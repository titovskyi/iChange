import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { setString, remove } from 'tns-core-modules/application-settings/application-settings';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';

import { AuthService } from '~/app/services/auth.service';
import {
    AuthActionTypes,
    CheckTokenFailure,
    CheckTokenSuccess,
    Confirm,
    ConfirmFailure,
    ConfirmSuccess,
    LogIn,
    LoginFailure,
    LogInSuccess,
    CheckToken
} from '~/app/store/actions/auth.actions';
import { User } from '~/app/models/user/user.model';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
    // #############################################

    constructor(private actions: Actions, private authService: AuthService, private router: Router) {}

    // #############################################

    @Effect()
    LogIn: Observable<LogInSuccess | LoginFailure> = this.actions.pipe(
        ofType<LogIn>(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap((phone: string) => {
            return this.authService.login(phone).pipe(
                map((code: number) => new LogInSuccess({phone, code})),
                catchError((error) => of(new LoginFailure(error)))
            );
        })
    );

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        map((action: LogInSuccess) => action.payload),
        tap((data) => {
            this.router.navigate(['confirm', { phone: data.phone }]);
        })
    );

    @Effect()
    Confirm: Observable<ConfirmSuccess | ConfirmFailure> = this.actions.pipe(
        ofType<Confirm>(AuthActionTypes.CONFIRM),
        map((action: Confirm) => action.payload),
        switchMap((data: { phone: string; confirmCode: number }) => {
            return this.authService.confirmUser(data.phone, data.confirmCode).pipe(
                map((response: User) => new ConfirmSuccess(response)),
                catchError((error) => of(new ConfirmFailure(error)))
            );
        })
    );

    @Effect({ dispatch: false })
    ConfirmSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.CONFIRM_SUCCESS),
        map((action: ConfirmSuccess) => action.payload),
        tap((user: User) => {
            setString('myChangeAccessToken', user.authToken);
            this.router.navigate(['main']);
        })
    );

    @Effect({ dispatch: false })
    ConfirmFailure: Observable<any> = this.actions.pipe(ofType(AuthActionTypes.CONFIRM_FAILURE));

    @Effect()
    CheckToken: Observable<CheckTokenSuccess | CheckTokenFailure> = this.actions.pipe(
        ofType<CheckToken>(AuthActionTypes.CHECK_TOKEN),
        switchMap(() => {
            return this.authService.checkToken().pipe(
                map((response: boolean) => new CheckTokenSuccess(response)),
                catchError((error) => of(new CheckTokenFailure(error)))
            );
        })
    );

    @Effect({ dispatch: false })
    CheckTokenSuccess: Observable<any> = this.actions.pipe(ofType(AuthActionTypes.CHECK_TOKEN_SUCCESS));

    @Effect({ dispatch: false })
    CheckTokenFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.CHECK_TOKEN_SUCCESS),
        tap(() => {
            remove('myChangeAccessToken');
            this.router.navigate(['login']);
        })
    );

    // #############################################
}
