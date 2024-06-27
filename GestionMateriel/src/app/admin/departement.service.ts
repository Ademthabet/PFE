import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

export class Departement {
  id!:number;
  numero!: number;
  nom!: string;
}
@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  REST_API: string = "http://127.0.0.1:8000/api/departement";
  // REST_APIB: string = "http://127.0.0.1:8000/api/bureau";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private httpClient: HttpClient) { }
  getMaxNumero(): Observable<number> {
    return this.httpClient.get<number>(`${this.REST_API}/maxNumero`).pipe(catchError(this.handleErrors));
  }
  addDepartement(data: Departement): Observable<any> {
    let API_URL = `${this.REST_API}`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleErrors));
  }
  getDepartements(): Observable<any> {
    return this.httpClient.get(this.REST_API).pipe(catchError(this.handleErrors));
  }
  updateDepartement(id: any, data: Departement): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleErrors));
  }
  deleteDepartement(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(catchError(this.handleErrors));
  }
  handleErrors(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
