import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hospital-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hospital-list.component.html',
})
export class HospitalListComponent {
  private http = inject(HttpClient);
  hospitals: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/hospitales').subscribe({
      next: (data) => (this.hospitals = data),
      error: (err) => console.error('Error al obtener hospitales', err),
    });
  }
}
