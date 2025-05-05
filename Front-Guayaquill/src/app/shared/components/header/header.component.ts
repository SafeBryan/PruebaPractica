import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  nombreUsuario: string = '';
  rolUsuario: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        const token = usuario.tokenNode || usuario.tokenSpring;

        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.nombreUsuario = payload.username || payload.sub || 'Usuario';
            this.rolUsuario = 'Sin rol'; // Puedes cambiar esto si tienes roles
          } catch (e) {
            console.error('Error al decodificar el token JWT:', e);
          }
        }
      }
    }
  }

  signOut() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.clear();
    }
    this.router.navigate(['/login']).then(() => {
      location.reload(); // fuerza recarga del componente
    });
  }
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('usuario') !== null;
    }
    return false;
  }
}
