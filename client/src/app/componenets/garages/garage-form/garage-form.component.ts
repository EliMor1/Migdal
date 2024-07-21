// src/app/garages/garage-form/garage-form.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GarageService } from '../garage.service';
import { IGarage } from '../../../interfaces/garage.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
      id: [{ value: null, disabled: this.isEditMode }, Validators.required],
      mispar_mosah: [null, Validators.required],
      shem_mosah: ['', Validators.required],
      cod_sug_mosah: [null, Validators.required],
      sug_mosah: ['', Validators.required],
      ktovet: ['', Validators.required],
      yishuv: ['', Validators.required],
      telephone: ['', Validators.required],
      mikud: [null, Validators.required],
      cod_miktzoa: [null, Validators.required],
      miktzoa: ['', Validators.required],
      menahel_miktzoa: ['', Validators.required],
      rasham_havarot: [null, Validators.required],
      TESTIME:['']
    });
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

      
      // if (this.isEditMode) {
      //   this.garageService.updateGarage(garage.id, garage)
      //     .pipe(takeUntil(this.destroy$))
      //     .subscribe(() => {
      //       this.router.navigate(['/garages']);
      //     });
      // } else {
      //   this.garageService.createGarage(garage)
      //     .pipe(takeUntil(this.destroy$))
      //     .subscribe(() => {
      //       this.router.navigate(['/garages']);
      //     });
      // }
      if (this.isEditMode) {
        this.garageService.updateGarage(garage.id, garage)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.snackBar.open('מוסך עודכן בהצלחה!', 'Close', config);
              this.router.navigate(['/garages']);
            },
            error => {
              this.snackBar.open('כשל בעדכון מוסך.', 'Close', config);
            }
          );
      } else {
        this.garageService.createGarage(garage)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.snackBar.open('מוסך חדש נוצר בהצלחה!', 'Close', config);
              this.router.navigate(['/garages']);
            },
            error => {
              this.snackBar.open('כשל ביצירת מוסך.', 'Close', config);
            }
          );
      }
    }
  }
}
