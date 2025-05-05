import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  private apiUrl = 'http://135.222.40.65:8080/consultas';

  constructor(private http: HttpClient) {}

  getConsultasPorHospital(hospitalId: string): Observable<Consulta[]> {
    const tokenSpring = localStorage.getItem('tokenSpring');
    const headers = new HttpHeaders({
      Authorization: tokenSpring ? `Bearer ${tokenSpring}` : '',
    });

    return this.http.get<Consulta[]>(
      `${this.apiUrl}/por-hospital/${hospitalId}`,
      { headers }
    );
  }

  enviarConsulta(consulta: Consulta): Observable<Consulta> {
    const tokenSpring = localStorage.getItem('tokenSpring');
    const headers = new HttpHeaders({
      Authorization: tokenSpring ? `Bearer ${tokenSpring}` : '',
    });

    return this.http.post<Consulta>(this.apiUrl, consulta, { headers });
  }

  getConsultasPorUsuario(): Observable<any[]> {
    const token = localStorage.getItem('tokenSpring');
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
    };
    return this.http.get<any[]>(`${this.apiUrl}/por-usuario`, {
      headers,
    });
  }
}
