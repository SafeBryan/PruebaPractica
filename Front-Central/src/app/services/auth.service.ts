import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/login';  // URL del backend para login

  constructor(private http: HttpClient, private router: Router) {}

  // Llamada al backend para autenticar al usuario
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  // Guardar el token en localStorage y redirigir
  authenticate(token: string): void {
    localStorage.setItem('authToken', token);  // Guarda el token en el localStorage
    this.router.navigate(['/inicio']);  // Redirige a la página principal
  }

  // Log out: elimina el token y redirige al login
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
