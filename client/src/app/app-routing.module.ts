import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageListComponent } from './componenets/garages/garage-list/garage-list.component';
import { GarageDetailComponent } from './componenets/garages/garage-detail/garage-detail.component';
import { GarageFormComponent } from './componenets/garages/garage-form/garage-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/garages', pathMatch: 'full' },
  { path: 'garages', component: GarageListComponent },
  { path: 'garages/new', component: GarageFormComponent },
  { path: 'garages/:id', component: GarageDetailComponent },
  { path: 'garages/:id/edit', component: GarageFormComponent },
  { path: '**', redirectTo: '/garages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
