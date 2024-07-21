// src/app/garages/garage-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGarage } from '../../interfaces/garage.interface';

@Injectable({
  providedIn: 'root'
})
export class GarageStateService {
  private garagesSubject = new BehaviorSubject<IGarage[]>([]);
  garages$ = this.garagesSubject.asObservable();

  updateGarages(garages: IGarage[]): void {
    this.garagesSubject.next(garages);
  }
}
