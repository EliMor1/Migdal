// src/app/garages/garage-detail/garage-detail.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from '../garage.service';
import { IGarage } from '../../../interfaces/garage.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-garage-detail',
  templateUrl: './garage-detail.component.html',
  styleUrls: ['./garage-detail.component.css']
})
export class GarageDetailComponent implements OnInit, OnDestroy  {
  garage: IGarage | undefined;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private garageService: GarageService) { }

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.garageService.getGarage(id).subscribe(data => {
  //     this.garage = data;
  //   });
  // }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.garageService.getGarage(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.garage = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
