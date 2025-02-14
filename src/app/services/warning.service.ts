import { Injectable, Injector } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpHeaders } from '@angular/common/http';
import { Warning } from '../models/warning';

@Injectable({
  providedIn: 'root'
})
export class WarningService extends BaseService {
    private readonly endpoint = 'avisos';
  
    constructor(injector: Injector) {
      super(injector);
    }
  
    create(aviso: Warning): Observable<Warning> {
      return this.http.post(this.getEndpoint(this.endpoint), aviso);
    }
  
    findByCategoryId(idCategoria: number): Observable<Warning> {
      return this.http.get(this.getEndpoint(`${this.endpoint}/${idCategoria}`));
    }

    findAll(): Observable<Warning[]> {
        return this.http.get<Warning[]>(this.getEndpoint(this.endpoint));
    }
  
    update(id: number, warning: Warning): Observable<Warning> {
      return this.http.put(this.getEndpoint(`${this.endpoint}/${id}`), warning);
    }
  
    delete(id: number): Observable<Warning> {
      return this.http.delete(this.getEndpoint(`${this.endpoint}/${id}`));
    }
  }
