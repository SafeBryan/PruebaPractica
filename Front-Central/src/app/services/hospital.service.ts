import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private apiUrl = 'http://74.235.206.253:3000/api/hospitales'; // <- Cambia esto si tu backend corre en otra URL o puerto

  constructor(private http: HttpClient) { }

  // Crear un hospital
  createHospital(hospital: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(`${this.apiUrl}`, hospital);
  }

  // Obtener todos los hospitales
  getHospitales(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${this.apiUrl}`);
  }

  // Obtener un hospital por ID
  getHospitalById(id: string): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un hospital
  updateHospital(id: string, hospital: Hospital): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, hospital);
  }

  // Eliminar un hospital
  deleteHospital(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Enviar una consulta a un hospital
  enviarConsulta(hospitalId: string, consultaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${hospitalId}/consultas`, consultaData);
  }

  // Obtener consultas externas de un hospital
  getConsultasExternas(hospitalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${hospitalId}/consultas`);
  }

}
