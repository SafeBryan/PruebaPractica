import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad.model'; // Ajusta el path si necesario

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private apiUrl = 'http://74.235.206.253:3000/api/especialidades'; // Cambia el puerto/URL si tu backend corre en otro

  constructor(private http: HttpClient) { }

  // Obtener todas las especialidades
  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.apiUrl);
  }

  // Crear una nueva especialidad
  createEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(this.apiUrl, especialidad);
  }

  // Actualizar una especialidad
  updateEspecialidad(id: number, especialidad: Especialidad): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, especialidad);
  }

  // Eliminar una especialidad
  deleteEspecialidad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
