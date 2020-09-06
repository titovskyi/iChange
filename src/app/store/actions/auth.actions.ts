import { Action } from '@ngrx/store';
import { User } from '~/app/models/user/user.model';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    LOGOUT = '[Auth] LogOut',
    CONFIRM = '[Auth] Confirm',
    CONFIRM_SUCCESS = '[Auth] Confirm Success',
    CONFIRM_FAILURE = '[Auth] Confirm Failure',
    CHECK_TOKEN = '[Auth] Check Token',
    CHECK_TOKEN_SUCCESS = '[Auth] Check Token Success',
    CHECK_TOKEN_FAILURE = '[Auth] Check Token Failure',
    CLEAR_ERROR = '[Auth] Clear Error'
}

// #############################################

export class LogIn implements Action {
    public readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: string) {}
}

export class LogInSuccess implements Action {
    public readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: { phone: string; code: number }) {}
}

export class LoginFailure implements Action {
    public readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: { status: number; statusText: string; error: string }) {}
}

// #############################################

export class Logout implements Action {
    public readonly type = AuthActionTypes.LOGOUT;
}

// #############################################

export class Confirm implements Action {
    public readonly type = AuthActionTypes.CONFIRM;
    constructor(public payload: any) {}
}

export class ConfirmSuccess implements Action {
    public readonly type = AuthActionTypes.CONFIRM_SUCCESS;
    constructor(public payload: User) {}
}

export class ConfirmFailure implements Action {
    public readonly type = AuthActionTypes.CONFIRM_FAILURE;
    constructor(public payload: { status: number; statusText: string; error: string }) {}
}

// #############################################

export class CheckToken implements Action {
    public readonly type = AuthActionTypes.CHECK_TOKEN;
    constructor() {}
}

export class CheckTokenSuccess implements Action {
    public readonly type = AuthActionTypes.CHECK_TOKEN_SUCCESS;
    constructor(public payload: boolean) {}
}

export class CheckTokenFailure implements Action {
    public readonly type = AuthActionTypes.CHECK_TOKEN_FAILURE;
    constructor(public payload: string) {}
}

// #############################################

export class ClearError implements Action {
    public readonly type = AuthActionTypes.CLEAR_ERROR;
}

// #############################################

export type AuthActions =
    | LogIn
    | LogInSuccess
    | LoginFailure
    | Logout
    | Confirm
    | ConfirmSuccess
    | ConfirmFailure
    | CheckToken
    | CheckTokenSuccess
    | CheckTokenFailure
    | ClearError;
