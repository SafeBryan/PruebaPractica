import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';

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
          if (typeof window !== 'undefined') {
            localStorage.setItem('tokenNode', resNode.token);
          }

          this.http.post<{ token: string }>(this.springUrl, data).subscribe({
            next: (resSpring) => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('tokenSpring', resSpring.token);
                localStorage.setItem(
                  'usuario',
                  JSON.stringify({
                    tokenNode: resNode.token,
                    tokenSpring: resSpring.token,
                  })
                );
              }

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
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
  }

  getTokenNode(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem('tokenNode')
      : null;
  }

  getTokenSpring(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem('tokenSpring')
      : null;
  }

  isLoggedIn(): boolean {
    return !!this.getTokenNode() && !!this.getTokenSpring();
  }
}
