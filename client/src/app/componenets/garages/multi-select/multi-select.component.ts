import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GarageService } from '../garage.service';
import { IExternalApiGarage, IGarage } from '../../../interfaces/garage.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { I18N } from '../../../common/i18n/General';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit, OnDestroy {
  garagesControl = new FormControl();
  garages: IGarage[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private garageService: GarageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.garageService.fetchFromApi()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.garages = data;
        },
        (error) => {
          console.error(I18N.GarageFetchingFailure, error);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  addSelectedGarages() {
    const selectedGarages: IGarage[] = this.garagesControl.value.map((garage: IExternalApiGarage) => {
      const { _id, ...garageData } = garage;
      return { ...garageData, id: _id };
    });
    
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:['snackbar-custom']
    };

    this.garageService.createManyGarages(selectedGarages)
    
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.snackBar.open(I18N.GarageCreateSuccess, 'Close', config);
        },
        error => {
          this.snackBar.open(I18N.GarageCreationFailure, 'Close', config);
          console.error(I18N.GarageCreationFailure, error);
        }
      );
  }

}
