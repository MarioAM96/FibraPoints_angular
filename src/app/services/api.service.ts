import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private apiUrl = 'https://api.tvmax.ec/api/';
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getCode(payload: any): Observable<any> {
    return this.http.post(this.apiUrl + 'obtener-codigo-fibrapoints', payload);
  }

  verifyCode(payload: any): Observable<any> {
    return this.http.post(this.apiUrl + 'verificar-codigo-fibrapoints', payload);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl + 'get-activeproducts/27');
  }

  // getProducts(): Observable<any> {
  //   return this.http.get(this.apiUrl + 'obtener-causales/27');
  // }
}