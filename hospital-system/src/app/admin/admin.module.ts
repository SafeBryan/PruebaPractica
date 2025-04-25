import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HospitalFormComponent } from './pages/hospital-form/hospital-form.component';
import { HospitalListComponent } from './pages/hospital-list/hospital-list.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HospitalFormComponent,
    HospitalListComponent,
  ],
})
export class AdminModule {}
