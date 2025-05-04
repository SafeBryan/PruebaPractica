import { Routes } from '@angular/router';
import { InicioComponent } from './core/components/inicio/inicio.component';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { HospitalesComponent } from './components/hospitales/hospitales.component';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'hospitales', component: HospitalesComponent },
  { path: 'especialidades', component: EspecialidadesComponent },
  { path: 'medicos', component: MedicosComponent },
  { path: 'consultas', component: ConsultasComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } // Ruta comodín para redirigir a login
];

