import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IGarage } from '../../interfaces/garage.interface';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private apiUrl = 'http://localhost:3001/api/garages'; 

  constructor(private http: HttpClient) { }

  getGarages(): Observable<IGarage[]> {
    return this.http.get<IGarage[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getGarage(id: number): Observable<IGarage> {
    return this.http.get<IGarage>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createGarage(garage: IGarage): Observable<IGarage> {
    return this.http.post<IGarage>(this.apiUrl, garage)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateGarage(id: number, garage: IGarage): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, garage)
      .pipe(
        catchError(this.handleError)
      );
  }

  createManyGarages(garages: IGarage[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/createMany`, garages)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `ארעה שגיאה: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `שגיאת מערכת ${error.status}, גוף השגיאה: ${error.error}`;
    }
    console.error(errorMessage);
    // Return an observable with a user-facing error message
    return throwError(() => new Error('ארעה שגיאה כללית, נא לנסות שוב מאוחר יותר'));
  }
}
