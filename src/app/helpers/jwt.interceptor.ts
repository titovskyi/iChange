import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { getString } from 'tns-core-modules/application-settings/application-settings';
import {AuthService} from "~/app/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    private authService: AuthService;

    // #############################################

    constructor(private injector: Injector) {}

    // #############################################

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(AuthService);
        const userAuthToken = this.authService.getToken();

        if (userAuthToken) {
            const authRequest = req.clone({
                setHeaders: {
                    authtoken: `${userAuthToken}`
                }
            });

            return next.handle(authRequest);
        }

        return next.handle(req);
    }

    // #############################################
}
