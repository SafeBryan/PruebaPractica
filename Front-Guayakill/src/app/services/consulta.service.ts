import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';
import { buildUrl } from './host'; // ajusta la ruta si tu archivo host.ts está en otro directorio

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  private baseUrl = buildUrl('spring', '/consultas');

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const tokenSpring = localStorage.getItem('tokenSpring');
    return new HttpHeaders({
      Authorization: tokenSpring ? `Bearer ${tokenSpring}` : '',
    });
  }

  getConsultasPorHospital(hospitalId: string): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(
      `${this.baseUrl}/por-hospital/${hospitalId}`,
      { headers: this.getHeaders() }
    );
  }

  enviarConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.baseUrl, consulta, {
      headers: this.getHeaders(),
    });
  }

  getConsultasPorUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/por-usuario`, {
      headers: this.getHeaders(),
    });
  }
}
