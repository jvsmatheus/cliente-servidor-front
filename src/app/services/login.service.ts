import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { firstValueFrom } from 'rxjs';

interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class LoginService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem(this.api_token_name);
        return !!token; // Retorna true se o token existir, false caso contrário
    }

    login(credentials: any): Promise<any> {
        return firstValueFrom(this.http.post<LoginResponse>(this.api_url + 'login', credentials));
    }

    logout(): Promise<any> {
        this.unsetApiToken();
        return firstValueFrom(this.http.post(this.api_url + 'logout', {}));
    }
}
