import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../services/base.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private baseService = inject(BaseService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.baseService.api_token_name);
    
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("cloned", cloned);
      
      return next.handle(cloned); // Prossegue com a requisição clonada
    }

    return next.handle(req);
  }
}
