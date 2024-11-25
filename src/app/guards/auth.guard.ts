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
    if (this.loginService.isLoggedIn()) { // Verifica se o usuário está autenticado
        console.log("aqi");
        
      return true;
    } else {
        console.log("lá");
        
      this.router.navigate(['/']); // Redireciona para login se não autenticado
      return false;
    }
  }
}
