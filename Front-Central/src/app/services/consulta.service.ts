import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Consulta {
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  medicoId: number;
  pacienteId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  private apiUrl = 'http://localhost:3000/api/hospitales'; // ⚡ Ajustado correctamente

  constructor(private http: HttpClient) {}

  getConsultasExternas(hospitalId: string): Observable<any[]> {
    const tokenSpring = localStorage.getItem('tokenSpring');
    const headers = new HttpHeaders({
      'Authorization-Spring': tokenSpring ? `Bearer ${tokenSpring}` : '',
    });

    return this.http.get<any[]>(`${this.apiUrl}/${hospitalId}/consultas`, {
      headers,
    });
  }

  enviarConsulta(hospitalId: string, consulta: Consulta): Observable<any> {
    const tokenSpring = localStorage.getItem('tokenSpring');
    const headers = new HttpHeaders({
      'Authorization-Spring': tokenSpring ? `Bearer ${tokenSpring}` : '',
    });

    return this.http.post(`${this.apiUrl}/${hospitalId}/consultas`, consulta, {
      headers,
    });
  }
}
