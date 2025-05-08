import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private apiUrl = 'https://hospital-cuenca.duckdns.org/pacientes';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('tokenSpring');
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl, this.getHeaders());
  }

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente, this.getHeaders());
  }

  actualizarPaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(
      `${this.apiUrl}/${id}`,
      paciente,
      this.getHeaders()
    );
  }

  eliminarPaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
