import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import { AuthService } from '~/app/services/auth.service';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/internal/operators";
import {getString} from "tns-core-modules/application-settings";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    // #############################################

    constructor(private router: Router, private authService: AuthService) {}

    // #############################################

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const userAuthToken = this.authService.getToken();
        if (userAuthToken) {
            return this.authService.checkToken().pipe(
                map((response) => {
                    console.log(response);
                    if (response) {
                        return true;
                    } else {
                        this.router.navigate(['login']);
                        this.authService.removeToken();

                        return false;
                    }
                }),
                catchError((err) => {
                    console.log(err);
                    this.router.navigate(['login']);
                    this.authService.removeToken();

                    return of(false);
                })
            );
        } else {
            this.router.navigate(['login']);

            return of(false);
        }
    }

    // #############################################
}
