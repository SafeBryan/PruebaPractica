import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hospitales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  nuevoHospital: Hospital = { nombre: '', direccion: '', urlApi: '' };
  selectedHospital: Hospital | null = null;

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(): void {
    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data;
      },
      (error) => {
        console.error('Error al cargar hospitales', error);
      }
    );
  }

  onSubmit(): void {
    if (this.selectedHospital) {
      if (this.selectedHospital.id !== undefined) {
        const updatedHospital: Hospital = {
          nombre: this.selectedHospital.nombre || '',
          direccion: this.selectedHospital.direccion || '',
          urlApi: this.selectedHospital.urlApi || ''
        };

        this.hospitalService.updateHospital(this.selectedHospital.id, updatedHospital).subscribe(
          () => {
            console.log('Hospital actualizado exitosamente');
            this.cargarHospitales();
            this.resetForm();
          },
          (error) => {
            console.error('Error al actualizar hospital', error);
          }
        );
      } else {
        console.error('El id del hospital no está definido');
      }
    } else {
      this.hospitalService.createHospital(this.nuevoHospital).subscribe(
        () => {
          console.log('Hospital creado exitosamente');
          this.cargarHospitales();
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear hospital', error);
        }
      );
    }
  }

  editarHospital(hospital: Hospital): void {
    this.selectedHospital = { ...hospital };
  }

  eliminarHospital(id: number): void {
    if (confirm('¿Estás seguro de eliminar este hospital?')) {
      this.hospitalService.deleteHospital(id.toString()).subscribe(
        () => {
          console.log('Hospital eliminado exitosamente');
          this.cargarHospitales();
        },
        (error) => {
          console.error('Error al eliminar hospital', error);
        }
      );
    }
  }

  resetForm(): void {
    this.nuevoHospital = { nombre: '', direccion: '', urlApi: '' };
    this.selectedHospital = null;
  }

  get nombre(): string {
    return this.selectedHospital ? this.selectedHospital.nombre : this.nuevoHospital.nombre;
  }

  set nombre(value: string) {
    if (this.selectedHospital) {
      this.selectedHospital.nombre = value;
    } else {
      this.nuevoHospital.nombre = value;
    }
  }

  get direccion(): string {
    return this.selectedHospital ? this.selectedHospital.direccion : this.nuevoHospital.direccion;
  }

  set direccion(value: string) {
    if (this.selectedHospital) {
      this.selectedHospital.direccion = value;
    } else {
      this.nuevoHospital.direccion = value;
    }
  }
}
