import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IGarage } from '../../interfaces/garage.interface';
import { ApiEnum } from '../../common/enums/Api.enum';
import { ErrorMessages } from '../../common/i18n/ErrorMessages';
import { GarageStateService } from './garage-state.service';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private apiUrl = ApiEnum.API_ROUTE; 

  constructor(private http: HttpClient, private garageStateService: GarageStateService) { }

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
    return this.http.post<void>(`${this.apiUrl}/${ApiEnum.CREATE_MANY_GARAGES_ROUTE}`, garages)
      .pipe(
        catchError(this.handleError),
        // Update the shared state after successful creation (calling a service for update and communication on demand).
        tap(() => this.getGarages().subscribe(updatedGarages => {
          this.garageStateService.updateGarages(updatedGarages);
        }))
      );
  }

  fetchFromApi(): Observable<IGarage[]> {
    return this.http.post<IGarage[]>(`${this.apiUrl}/${ApiEnum.EXTERNAL_API_ROUTE}`, {})
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `${ErrorMessages.ErrorOccured}: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `${ErrorMessages.SystemError}: ${error.status}`;
    }
    console.error(errorMessage);
    // Return an observable with a user-facing error message
    return throwError(() => new Error('ארעה שגיאה כללית, נא לנסות שוב מאוחר יותר'));
  }
}
