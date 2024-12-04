import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    private loginService = inject(LoginService);
    private router = inject(Router);

    canActivate(): boolean | UrlTree {
        if (this.loginService.isLoggedIn()) {
            return true;
        } else {
            if (this.router.url !== '/') {
                return this.router.parseUrl('/');
            }
            return false;
        }
    }
}
