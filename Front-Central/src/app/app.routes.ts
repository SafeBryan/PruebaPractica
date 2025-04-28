import { Routes } from '@angular/router';
import { InicioComponent } from './core/components/inicio/inicio.component';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { HospitalesComponent } from './components/hospitales/hospitales.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { MedicosComponent } from './components/medicos/medicos.component';


export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'hospitales', component: HospitalesComponent },
  { path: 'especialidades', component: EspecialidadesComponent },
  { path: 'medicos', component: MedicosComponent },



];
