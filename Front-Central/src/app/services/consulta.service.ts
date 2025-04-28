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
  providedIn: 'root',
})
export class ConsultasService {
  private apiUrl = 'http://localhost:3000/api/hospitales'; // ⚡ Ajustado correctamente

  constructor(private http: HttpClient) {}

  // Obtener consultas de un hospital externo
  getConsultasExternas(hospitalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${hospitalId}/consultas`);
  }

  // Enviar una nueva consulta al hospital externo
  enviarConsulta(hospitalId: string, consulta: Consulta): Observable<any> {
    return this.http.post(`${this.apiUrl}/${hospitalId}/consultas`, consulta);
  }
}
