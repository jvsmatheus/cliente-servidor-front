import { Injectable, Injector } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
    private readonly endpoint = 'usuarios';
  
    constructor(injector: Injector) {
      super(injector);
    }
  
    create(user: any): Promise<any> {
      return firstValueFrom(this.http.post(this.getEndpoint(this.endpoint), user));
    }
  
    findAll(): Promise<any> {
      return firstValueFrom(this.http.get(this.getEndpoint(this.endpoint)));
    }

    findByEmail(email: string): Promise<any> {
      return firstValueFrom(this.http.get(this.getEndpoint(`${this.endpoint}/${email}`)));
    }
  
    update(email: string, user: any): Promise<any> {
      return firstValueFrom(this.http.put(this.getEndpoint(`${this.endpoint}/${email}`), user));
    }
  
    delete(email: string): Promise<any> {
      return firstValueFrom(this.http.delete(this.getEndpoint(`${this.endpoint}/${email}`)));
    }
  }
