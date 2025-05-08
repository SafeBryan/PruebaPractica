// src/app/services/paciente.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private apiUrl = 'https://hospital-cuenca.duckdns.org/pacientes'; // Spring Boot

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<any[]> {
    const token = localStorage.getItem('tokenSpring');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
