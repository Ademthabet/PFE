import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

export class Employe {
  id!: Number;
  code!: String;
  nom!: String;
  prenom!: String;
  dateRecrutement!: Date;
  email!: String;
  password!: String;
  tel!: number;
  role!: String;
  bureaus_id?: number;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private apiURL = "http://localhost:8000/api/employe/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  updateEmployeAff(employe: any): Observable<any> {
    const url = `${this.apiURL}updateEmployeAff/${employe.id}`;
    return this.httpClient.put<any>(url, employe);
  }
  getEmployes(): Observable<any> {
    return this.httpClient.get(this.apiURL).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
