import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateValidationService {
  REST_API: string = "http://127.0.0.1:8000/api/dateValidation";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  createDateValidation(date: any): Observable<any> {
    return this.httpClient.post<any>(this.REST_API, date);
  }
}
