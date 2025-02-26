import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.tvmax.ec/api/';

  constructor(private http: HttpClient) {}

  getProyects(): Observable<any> {
    return this.http.get(this.apiUrl + 'get-keys');
  }


}