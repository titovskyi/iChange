import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { getString, remove } from 'tns-core-modules/application-settings/application-settings';
import { Observable } from 'rxjs';
import { User } from '../models/user/user.model';
import { map } from 'rxjs/internal/operators';
import { UserFactory } from '~/app/models/user/user.factory';
import { Router } from '@angular/router';

import { Config } from '../assets/config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public static readonly DOMAIN = Config.api;

    public static readonly UPLOADS_URL = `${AuthService.DOMAIN}/upload`;

    public static readonly USER_URL = `${AuthService.DOMAIN}/user`;

    public static readonly CHECK_TOKEN_URL = `${AuthService.DOMAIN}/user/check-token`;

    public static readonly LOGIN_URL = `${AuthService.DOMAIN}/user/login`;

    // #############################################

    constructor(private http: HttpClient, private userFactory: UserFactory, private router: Router) {}

    // #############################################

    public authUserByToken(): Observable<User> {
        return this.http.get<User>(AuthService.USER_URL).pipe(
            map((response: any) => {
                return this.userFactory.create(response);
            })
        );
    }

    // #############################################

    public getToken() {
        return getString('myChangeAccessToken');
    }

    public removeToken() {
        remove('myChangeAccessToken');
    }

    public login(phone: string): Observable<number> {
        return this.http.post<number>(AuthService.LOGIN_URL, { phone });
    }

    public logout() {
        remove('myChangeAccessToken');
        this.router.navigate(['login']);
    }

    // public confirmUser(phone: string, confirmCode: number): Observable<{ token: string }> {
    //     return this.http.post<{ token: string }>(AuthService.USER_URL, { phone, confirmCode });
    // }

    public confirmUser(phone: string, confirmCode: number): Observable<User> {
        return this.http.post<User>(AuthService.USER_URL, { phone, confirmCode });
    }

    public checkToken(): Observable<boolean> {
        return this.http.get<boolean>(AuthService.CHECK_TOKEN_URL);
    }

    // #############################################
}
