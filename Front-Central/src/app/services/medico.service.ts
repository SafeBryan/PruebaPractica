import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'http://localhost:3000/api/medicos'; // Asegúrate que esta URL sea la correcta

  constructor(private http: HttpClient) {}

  // Obtener todos los médicos
  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  // Obtener un médico por ID
  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo médico
  createMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico);
  }

  // Actualizar un médico existente
  updateMedico(id: number, medico: Medico): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medico);
  }

  // Eliminar un médico
  deleteMedico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
