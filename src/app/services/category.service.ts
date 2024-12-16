import { Injectable, Injector } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BaseService } from './base.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
    private readonly endpoint = 'categorias';
  
    constructor(injector: Injector) {
      super(injector);
    }
  
    create(category: any): Promise<any> {
      return firstValueFrom(this.http.post(this.getEndpoint(this.endpoint), category));
    }
  
    findAll(): Promise<any> {
      return firstValueFrom(this.http.get(this.getEndpoint(this.endpoint)));
    }

    findById(id: number): Promise<any> {
      return firstValueFrom(this.http.get(this.getEndpoint(`${this.endpoint}/${id}`)));
    }
  
    update(id: number, category: any): Promise<any> {
      return firstValueFrom(this.http.put(this.getEndpoint(`${this.endpoint}/${id}`), category));
    }
  
    delete(id: number): Promise<any> {
      return firstValueFrom(this.http.delete(this.getEndpoint(`${this.endpoint}/${id}`)));
    }
  }
