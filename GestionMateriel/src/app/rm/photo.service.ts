
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
export class Photo {
  id?: number;
  nom!: string;
  type!: string;
  materiel_id!: number;
  employe_id?: number;
}
interface PhotoResponse {
  success: boolean;
  photo_path?: string;
  message?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  REST_API: string = "http://127.0.0.1:8000/api/photo";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  getPhotosByEmployeeId(employeeId: number): Observable<PhotoResponse> {
    const url = `${this.REST_API}/employe/${employeeId}`;
    return this.httpClient.get<PhotoResponse>(url);
  }
  uploadPhotoEmploye(employeId: number, formData: FormData): Observable<any> {
    console.log(formData)
    return this.httpClient.post<any>(`${this.REST_API}/photoEmploye/${employeId}`, formData)
      .pipe(
        catchError(this.handleErrors)
      );
  }
  uploadPhoto(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.REST_API}`, formData)
      .pipe(
        catchError(this.handleErrors)
      );
  }
  getPhotosByMaterielId(materielId: number): Observable<PhotoResponse> {
    const url = `${this.REST_API}/materiel/${materielId}`;
    return this.httpClient.get<PhotoResponse>(url);
  }
  updatePhotoMateriel(id: number, formData: any): Observable<any> {
    return this.httpClient.put(`${this.REST_API}/${id}`, formData).pipe(
      catchError(this.handleErrors)
    );
  }
  deletePhotoAndMaterialByMaterielId(materielId: number): Observable<any> {
    return this.httpClient.delete(`${this.REST_API}/deletePhotoAndMaterialByMaterielId/${materielId}`);
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
