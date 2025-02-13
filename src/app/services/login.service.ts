import { inject, Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class LoginService extends BaseService {

    private router = inject(Router);
    
    constructor(injector: Injector) {
        super(injector);
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem(this.api_token_name);
        return !!token; // Retorna true se o token existir, false caso contrário
    }

    login(credentials: any): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.api_url + 'login', credentials);
    }

    logout(){
        this.unsetApiToken();
        this.router.navigate(['/']);
    }
}
