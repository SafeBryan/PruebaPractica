import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalRoutingModule } from './hospital-routing.module';
import { ConsultasComponent } from './pages/consultas/consultas.component';

@NgModule({
  imports: [CommonModule, HospitalRoutingModule, ConsultasComponent],
})
export class HospitalModule {}
