import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
export class Employe {
  id!: number;
  code!: string;
  email!: string;
  dateRecrutement!: Date | null;
  role!: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  REST_API: string = "http://127.0.0.1:8000/api/employe";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  addEmployeeee(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/addEmploye`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleErrors));
  }
  getEmployes(): Observable<any> {
    return this.httpClient.get(this.REST_API).pipe(catchError(this.handleErrors));
  }
  updateEmploye(id: any, data: Employe): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleErrors));
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
