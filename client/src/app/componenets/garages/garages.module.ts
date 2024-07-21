// src/app/garages/garages.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { GarageListComponent } from './garage-list/garage-list.component';
import { GarageDetailComponent } from './garage-detail/garage-detail.component';
import { GarageFormComponent } from './garage-form/garage-form.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    GarageListComponent,
    GarageDetailComponent,
    GarageFormComponent,
    MultiSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatSnackBarModule
  ]
})
export class GaragesModule { }
