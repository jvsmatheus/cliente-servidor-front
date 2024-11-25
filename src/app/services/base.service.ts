import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    http: HttpClient;
    api_url: string = environment.api_url;
    api_token_name: string = environment.api_token;

    constructor(injector: Injector) {
        this.http = injector.get(HttpClient);
    }

    get get_tokens() {
        return {
            headers: {
                Authorization: `Bearer ${this.api_token_value}`,
            },
        };
    }

    get api_token_value() {
        return localStorage.getItem(this.api_token_name);
    }

    setApiToken(token: string) {
        localStorage.setItem(this.api_token_name, token);
    }

    unsetApiToken() {
        localStorage.removeItem(this.api_token_name);
    }

    getEndpoint(path: string): string {
        return `${this.api_url}${path}`;
    }
}
