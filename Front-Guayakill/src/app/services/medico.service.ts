import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';
import { buildUrl } from './host'; // Ajusta la ruta si tu archivo host.ts está en otra carpeta

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private baseUrl = buildUrl('node', '/medicos');

  constructor(private http: HttpClient) {}

  // Obtener todos los médicos
  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.baseUrl);
  }

  getMedicosByHospital(hospitalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hospital/${hospitalId}`);
  }

  // Obtener un médico por ID
  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo médico
  createMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.baseUrl, medico);
  }

  // Actualizar un médico existente
  updateMedico(id: number, medico: Medico): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, medico);
  }

  // Eliminar un médico
  deleteMedico(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
