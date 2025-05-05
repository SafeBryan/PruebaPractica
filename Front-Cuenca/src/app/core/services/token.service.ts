import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tokenSpring'); // o 'tokenNode'
    }
    return null;
  }
}
