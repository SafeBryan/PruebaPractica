import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado.model';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  hospitales: Hospital[] = [];
  nuevoEmpleado: Empleado = { nombre: '', cargo: '', hospitalId: 0 };
  selectedEmpleado: Empleado | null = null;

  constructor(
    private empleadoService: EmpleadoService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarHospitales();
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data.map((empleado) => this.mapearEmpleado(empleado));
      },
      (error) => {
        console.error('Error al cargar empleados', error);
      }
    );
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
    if (this.selectedEmpleado) {
      if (this.selectedEmpleado.id !== undefined) {
        const updatedEmpleado: Empleado = {
          nombre: this.selectedEmpleado.nombre,
          cargo: this.selectedEmpleado.cargo,
          hospitalId: this.selectedEmpleado.hospitalId,
        };
        this.empleadoService
          .updateEmpleado(this.selectedEmpleado.id, updatedEmpleado)
          .subscribe(
            () => {
              this.cargarEmpleados();
              this.resetForm();
            },
            (error) => {
              console.error('Error al actualizar empleado', error);
            }
          );
      }
    } else {
      this.empleadoService.createEmpleado(this.nuevoEmpleado).subscribe(
        () => {
          this.cargarEmpleados();
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear empleado', error);
        }
      );
    }
  }

  editarEmpleado(empleado: Empleado): void {
    this.selectedEmpleado = { ...empleado };
  }

  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe(
        () => {
          this.cargarEmpleados();
        },
        (error) => {
          console.error('Error al eliminar empleado', error);
        }
      );
    }
  }

  resetForm(): void {
    this.nuevoEmpleado = { nombre: '', cargo: '', hospitalId: 0 };
    this.selectedEmpleado = null;
  }

  get nombre(): string {
    return this.selectedEmpleado
      ? this.selectedEmpleado.nombre
      : this.nuevoEmpleado.nombre;
  }

  set nombre(value: string) {
    if (this.selectedEmpleado) {
      this.selectedEmpleado.nombre = value;
    } else {
      this.nuevoEmpleado.nombre = value;
    }
  }

  get cargo(): string {
    return this.selectedEmpleado
      ? this.selectedEmpleado.cargo
      : this.nuevoEmpleado.cargo;
  }

  set cargo(value: string) {
    if (this.selectedEmpleado) {
      this.selectedEmpleado.cargo = value;
    } else {
      this.nuevoEmpleado.cargo = value;
    }
  }

  get hospitalId(): number {
    return this.selectedEmpleado
      ? this.selectedEmpleado.hospitalId
      : this.nuevoEmpleado.hospitalId;
  }

  set hospitalId(value: number) {
    if (this.selectedEmpleado) {
      this.selectedEmpleado.hospitalId = value;
    } else {
      this.nuevoEmpleado.hospitalId = value;
    }
  }

  private mapearEmpleado(empleado: any): Empleado {
    return {
      id: empleado.id,
      nombre: empleado.nombre,
      cargo: empleado.cargo,
      hospitalId: empleado.hospitalId ?? empleado.hospital_id,
      hospitalNombre: empleado.hospitalNombre ?? empleado.hospital_nombre,
    };
  }
}
