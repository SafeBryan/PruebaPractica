// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';

// src/app/services/auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private nodeUrl = 'http://localhost:3000/api/auth/login';
  private springUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  loginAmbos(
    data: LoginRequest
  ): Observable<{ tokenNode: string; tokenSpring: string }> {
    return new Observable((observer) => {
      this.http.post<{ token: string }>(this.nodeUrl, data).subscribe({
        next: (resNode) => {
          localStorage.setItem('tokenNode', resNode.token);

          this.http.post<{ token: string }>(this.springUrl, data).subscribe({
            next: (resSpring) => {
              localStorage.setItem('tokenSpring', resSpring.token);
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
    localStorage.removeItem('tokenNode');
    localStorage.removeItem('tokenSpring');
    this.router.navigate(['/login']);
  }

  getTokenNode(): string | null {
    return localStorage.getItem('tokenNode');
  }

  getTokenSpring(): string | null {
    return localStorage.getItem('tokenSpring');
  }

  isLoggedIn(): boolean {
    return !!this.getTokenNode() && !!this.getTokenSpring();
  }
}
