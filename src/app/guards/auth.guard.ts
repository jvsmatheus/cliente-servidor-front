import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loginService = inject(LoginService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      // Evitar redirecionamento para a página de login caso já esteja nela
      if (this.router.url !== '/') {
        this.router.navigate(['/']);
      }
      return false;
    }
  }
}
