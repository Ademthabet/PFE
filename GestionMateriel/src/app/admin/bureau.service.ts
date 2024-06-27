import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Departement } from './departement.service';

export class Bureau {
  id!: number;
  numero!: number;
  departement_id!: number;
  nom?: string;
  departement?: { nom: string };
  nomDepartement?: string;
}
@Injectable({
  providedIn: 'root'
})
export class BureauService {
  REST_API: string = "http://127.0.0.1:8000/api/bureau";
  REST_APID: string = "http://127.0.0.1:8000/api/departement";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  getMaxNumero(): Observable<number> {
    return this.httpClient.get<number>(`${this.REST_API}/maxNumero`).pipe(catchError(this.handleErrors));
  }
  getAllDepartements(): Observable<Departement[]> {
    return this.httpClient.get<Departement[]>(`${this.REST_APID}`);
  }
  addBureau(data: Bureau): Observable<any> {
    let API_URL = `${this.REST_API}`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleErrors));
  }
  getBureaus() {
    return this.httpClient.get(`${this.REST_API}`);
  }
  updateBureau(id: number, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            return throwError("Le numéro de bureau existe déjà.");
          }
          return throwError("Une erreur s'est produite lors de la mise à jour du bureau.");
        })
      );
  }
  supprimerBureau(id: number): Observable<void> {
    const url = `${this.REST_API}/${id}`;
    return this.httpClient.delete<void>(url);
  }
  getBureauxWithDepartments(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API}/bureaux`).pipe(
      catchError(this.handleErrors)
    );
  }
  getBureauByEmployeId(id: number): Observable<any>  {
    return this.httpClient.get<any>(`${this.REST_API}/getBureauByEmployeId/${id}`);
  }
  handleErrors(error: HttpErrorResponse) {
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
