// src/app/garages/garage-list/garage-list.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GarageService } from '../garage.service';
import { IGarage } from '../../../interfaces/garage.interface';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GarageStateService } from '../garage-state.service';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.css']
})
export class GarageListComponent implements OnInit, OnDestroy  {
  garages: IGarage[] = [];
  // remove to enum file that imports these strings in displayed array
  // displayedColumns: string[] = ['id', 'name', 'location', 'telephone', 'actions'];
  displayedColumns: string[] = [
    'id',
    'mispar_mosah',
    'shem_mosah',
    'cod_sug_mosah',
    'sug_mosah',
    'ktovet',
    'yishuv',
    'telephone',
    'mikud',
    'cod_miktzoa',
    'miktzoa',
    'menahel_miktzoa',
    'rasham_havarot',
    'TESTIME',
    'actions'
  ];
  
  private destroy$ = new Subject<void>();

  constructor(
    private garageService: GarageService,
    private router: Router,
    private garageStateService: GarageStateService
  ) { }

  ngOnInit() {
    this.garageService.getGarages()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.garages = data;
      });
    this.garageStateService.garages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.garages = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  viewGarage(id: string): void {
    this.router.navigate([`/garages/${id}`]);
  }

  editGarage(id: string): void {
    this.router.navigate([`/garages/edit/${id}`]);
  }
}
