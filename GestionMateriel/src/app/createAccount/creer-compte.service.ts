import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
export class Employe {
  id?: number;
  email!: string;
  nom!: string;
  prenom!: string;
  password!: string;
  tel!: number;
  emailChercher?: boolean;
  role?: string;
}
@Injectable({
  providedIn: 'root'
})
export class CreerCompteService {
  REST_API: string = "http://127.0.0.1:8000/api/employe";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  prenom: string = ''; 
  nom: string = ''; 
  constructor(private httpClient: HttpClient) { }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public getData(key: string) {
    return localStorage.getItem(key)
  }
  getDetailsEmploye(id: any) {
    return this.httpClient.get<any>(`${this.REST_API}/details/${id}`);
  }
  modification(id: number, employeData: Employe): Observable<any> {
    return this.httpClient.put<any>(`${this.REST_API}/create/${id}`, employeData);
  }
  rechercherEmployeParEmailEtPassword(email: string, password: string): Observable<any> {
    const API_URL = `${this.REST_API}/search?email=${email}&password=${password}`;
    return this.httpClient.get(API_URL);
  }
  rechercherEmployeParEmail(email: string): Observable<boolean> {
    const API_URL = `${this.REST_API}/email?email=${email}`;
    return this.httpClient.get<Employe[]>(API_URL, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.exists),
      catchError(() => of(false))
    );
  }
  modifierEmploye(employe: Employe): Observable<any> {
    const API_URL = `${this.REST_API}/creation/${employe.id}`; 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put(API_URL, employe, httpOptions).pipe(
      catchError((error) => {
        throw error;
      })
    );
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
