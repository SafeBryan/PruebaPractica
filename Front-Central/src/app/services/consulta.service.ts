import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Consulta {
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  medicoId: string;
  pacienteId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private baseUrl = 'http://localhost:3000/hospitales';  // Ajusta si tu API corre en otro puerto/url

  constructor(private http: HttpClient) { }

  // Obtener todas las consultas de un hospital
  getConsultas(hospitalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${hospitalId}/consultas`);
  }

  // Enviar una nueva consulta
  enviarConsulta(hospitalId: string, consulta: Consulta): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${hospitalId}/consultas`, consulta);
  }
}
