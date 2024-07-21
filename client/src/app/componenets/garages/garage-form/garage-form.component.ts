// src/app/garages/garage-form/garage-form.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GarageService } from '../garage.service';
import { IGarage } from '../../../interfaces/garage.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { I18N } from '../../../common/i18n/General';

@Component({
  selector: 'app-garage-form',
  templateUrl: './garage-form.component.html',
  styleUrls: ['./garage-form.component.css']
})
export class GarageFormComponent implements OnInit, OnDestroy {
  garageForm: FormGroup;
  isEditMode = false;
  private destroy$ = new Subject<void>();
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private garageService: GarageService,
    private snackBar: MatSnackBar
  ) {
    this.garageForm = this.fb.group({
      id: [{ value: null, disabled: this.isEditMode }, [Validators.required, Validators.min(1)]],
      mispar_mosah: [null, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      shem_mosah: ['', [Validators.required, Validators.maxLength(100)]],
      cod_sug_mosah: [null, [Validators.required, Validators.min(1)]],
      sug_mosah: ['', Validators.required],
      ktovet: ['', [Validators.required, Validators.maxLength(255)]],
      yishuv: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{3}-?\d{7}$/)]],
      mikud: [null, [Validators.required, Validators.min(10000)]],
      cod_miktzoa: [null, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      miktzoa: ['', Validators.required],
      menahel_miktzoa: ['', Validators.required],
      rasham_havarot: [null, [Validators.required, Validators.min(1)]],
      TESTIME: ['']
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.garageService.getGarage(Number(id))
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.garageForm.patchValue(data);
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.garageForm.valid) {
      const garage:IGarage = this.garageForm.value;
      const config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass:['snackbar-custom']
      };

      if (this.isEditMode) {
        this.garageService.updateGarage(garage.id, garage)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.snackBar.open(I18N.GarageUpdateSuccess, 'Close', config);
              this.router.navigate(['/garages']);
            },
            error => {
              this.snackBar.open(I18N.GarageUpdateFailure, 'Close', config);
            }
          );
      } else {
        this.garageService.createGarage(garage)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.snackBar.open(I18N.GarageCreateSuccess, 'Close', config);
              this.router.navigate(['/garages']);
            },
            error => {
              this.snackBar.open(I18N.GarageCreationFailure, 'Close', config);
            }
          );
      }
    }
  }
}
