import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hospital {
  id?: string;
  nombre: string;
  direccion: string;
  urlApi: string;
}

@Injectable({ providedIn: 'root' })
export class HospitalService {
  private baseUrl = 'http://localhost:3000/api/hospitales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.baseUrl);
  }

  getById(id: string): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.baseUrl}/${id}`);
  }

  create(hospital: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(this.baseUrl, hospital);
  }

  update(id: string, hospital: Hospital): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, hospital);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
