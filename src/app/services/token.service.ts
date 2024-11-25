import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  // Método para decodificar o token
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  // Método para obter uma claim específica
  getClaim(token: string, claim: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claim] : null;
  }
}
