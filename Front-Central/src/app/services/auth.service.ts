import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login para central + hospital (Node + Spring)
   * @param data credenciales del usuario
   * @param hospitalKey clave del hospital ('cuenca', 'guayaquil', 'latacunga')
   */
  loginAmbos(
    data: LoginRequest,
    hospitalKey: 'cuenca' | 'guayaquil' | 'latacunga'
  ): Observable<{ tokenNode: string; tokenSpring: string }> {
    const nodeUrl = `${environment.backends.central.nodeUrl}/auth/login`;
    const springUrl = `${environment.backends[hospitalKey].springUrl}/auth/login`;

    return new Observable((observer) => {
      // Login al central (Node.js)
      this.http.post<{ token: string }>(nodeUrl, data).subscribe({
        next: (resNode) => {
          localStorage.setItem('tokenNode', resNode.token);

          // Login al hospital (Spring Boot)
          this.http.post<{ token: string }>(springUrl, data).subscribe({
            next: (resSpring) => {
              localStorage.setItem('tokenSpring', resSpring.token);
              localStorage.setItem('hospitalSeleccionado', hospitalKey);
              localStorage.setItem(
                'usuario',
                JSON.stringify({
                  tokenNode: resNode.token,
                  tokenSpring: resSpring.token,
                  hospital: hospitalKey,
                })
              );

              observer.next({
                tokenNode: resNode.token,
                tokenSpring: resSpring.token,
              });
              observer.complete();
            },
            error: (err) => observer.error({ source: 'spring', error: err }),
          });
        },
        error: (err) => observer.error({ source: 'node', error: err }),
      });
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getTokenNode(): string | null {
    return localStorage.getItem('tokenNode');
  }

  getTokenSpring(): string | null {
    return localStorage.getItem('tokenSpring');
  }

  getHospitalSeleccionado(): 'cuenca' | 'guayaquil' | 'latacunga' | null {
    return localStorage.getItem('hospitalSeleccionado') as any;
  }

  isLoggedIn(): boolean {
    return !!this.getTokenNode() && !!this.getTokenSpring();
  }
}
