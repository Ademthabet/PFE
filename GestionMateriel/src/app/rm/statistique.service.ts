import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private apiUrl = "http://127.0.0.1:8000/api/statistiques";

  constructor(private http: HttpClient) { }

  getStatistiquesMensuelles(mois: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistiquesmensuelles`,{ params: { mois: mois.toString() } });
  }
  délaiAttenteDemandes(mois: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/délaiAttenteDemandes`,{ params: { mois: mois.toString() } });
  }
  getNombreMatérielsParEmploye(mois: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getNombreMatérielsParEmploye`,{ params: { mois: mois.toString() } });
  }
}
