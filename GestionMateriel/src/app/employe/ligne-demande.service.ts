import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
export class LigneDemandeMateriel {
  id!: number;
  numero!: Number;
  quantiteDem!: Number;
  demandeMateriels_id!: Number;
  materiels_id!: Number;
  designation?: String;
  description?: String;
  type?: String;
  materiel_id?: Number;
  quantitee?: string;
  etat?: string;
}
@Injectable({
  providedIn: 'root'
})
export class LigneDemandeService {
  private apiURL = "http://127.0.0.1:8000/api/ligneDemande";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private httpClient: HttpClient) { }
  createLigneDemande(ligneDemandeData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL, ligneDemandeData);
  }
  getLignesWithMateriels(): Observable<LigneDemandeMateriel[]> {
    return this.httpClient.get<LigneDemandeMateriel[]>(`${this.apiURL}/lignes`).pipe(
      catchError(this.errorHandler)
    );
  }
  deleteLigneDemande(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/${id}`);
  }
  createLignesDemandes(ligneDemande: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/store`, ligneDemande);
  }
  updateQuantiteAndMaterielId(id: number, newData: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/ligneDemande/${id}`, newData);
  }
  modifierEtatLigne(ligneId: number, nouvelEtat: string): Observable<any> {
    const url = `${this.apiURL}/modifierEtatLigne/${ligneId}`;
    return this.httpClient.put(url, { nouvelEtat });
  }
  updateStockQuantity(ligneId: number, newQuantity: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/updateStockQuantity/${ligneId}`, { quantite: newQuantity });
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
