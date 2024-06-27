import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
export class DemandeMateriel {
  id!: Number;
  numero!: Number;
  date!: Date;
  employe_id!: Number;
  prenom?:string;
  nom?:string;
}
@Injectable({
  providedIn: 'root'
})
export class DemandeMaterielService {
  private apiURL = "http://localhost:8000/api/demandeMateriel";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private httpClient: HttpClient) { }
  getMaxNumeroDemande(employeId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURL}/maxNumeroDemande/${employeId}`).pipe(catchError(this.errorHandler));
  }
  createDemandeMateriel(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.errorHandler)
    );
  }
  getDemandesWithIdEmployes(idEmploye:any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiURL}/getDemandesParIdEmploye/${idEmploye}`);
  }
  getDemandesWithIdEmploye(idEmploye:any,etat: any = null): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiURL}/getDemandesParIdEmploye/${idEmploye}/${etat}`);
  }
  deleteDemandeAndLignes(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/${id}`);
  }
  getDemandesWithEmployes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiURL}/demandesWithEmploye`);
  }
  updateDemandeEtat(demandeId: number, newStatus: string): Observable<any> {
    const url = `${this.apiURL}/updateEtat/${demandeId}`;
    return this.httpClient.put<any>(url, { etat: newStatus });
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
