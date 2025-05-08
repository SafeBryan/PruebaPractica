import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'consultas', component: ConsultasComponent },
      { path: 'pacientes', component: PacientesComponent },
    ],
  },
];
