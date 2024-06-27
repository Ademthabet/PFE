import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
export class Materiel {
  id!: number;
  code!: string;
  designation!: string;
  description!: string;
  type!: string;
  quantite!: number;
  nouvelle_photo?: File | null;
  employe_id?: Number;
  bureaus_id?: number;
  // employe_id!: number;
  // bureaus_id!: number;
}
@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  REST_API: string = "http://127.0.0.1:8000/api/materiel";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  getMateriels(): Observable<any> {
    return this.httpClient.get(this.REST_API).pipe(catchError(this.handleErrors));
  }
  getValidatedMaterielsByEmployeeId(id: number): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/getValidatedMateriels/${id}`);
  }
  updateMaterielAff(materiel: any): Observable<any> {
    const url = `${this.REST_API}/updateMaterielAff/${materiel.id}`;
    return this.httpClient.put<any>(url, materiel);
  }
  getMaterielsByEmployeId(id: number): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/getMaterielsByEmployeId/${id}`);
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
