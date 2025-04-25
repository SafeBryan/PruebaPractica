import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalListComponent } from './pages/hospital-list/hospital-list.component';
import { HospitalFormComponent } from './pages/hospital-form/hospital-form.component';

const routes: Routes = [
  { path: 'hospitales', component: HospitalListComponent },
  { path: 'hospitales/nuevo', component: HospitalFormComponent },
  { path: 'hospitales/editar/:id', component: HospitalFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
