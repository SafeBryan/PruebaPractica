import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { HospitalService } from '../../services/hospital.service';
import { Empleado } from '../../models/empleado.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  hospitales: Hospital[] = [];
  mostrarModal: boolean = false;
  empleadoEditando: Empleado | null = null;
  nuevoEmpleado: Empleado = { nombre: '', cargo: '', hospitalId: 0 };

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
        this.empleados = data.map((empleado: any) => this.mapearEmpleado(empleado));
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

  abrirModalNuevo(): void {
    this.empleadoEditando = null;
    this.nuevoEmpleado = { nombre: '', cargo: '', hospitalId: 0 };
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.empleadoEditando = null;
    this.nuevoEmpleado = { nombre: '', cargo: '', hospitalId: 0 };
  }

  onSubmit(): void {
    const empleado = this.empleadoEditando ?? this.nuevoEmpleado;

    if (this.empleadoEditando && this.empleadoEditando.id !== undefined) {
      const actualizado: Empleado = {
        nombre: empleado.nombre,
        cargo: empleado.cargo,
        hospitalId: empleado.hospitalId
      };
      this.empleadoService.updateEmpleado(this.empleadoEditando.id, actualizado).subscribe(
        () => {
          this.cargarEmpleados();
          this.cerrarModal();
        },
        (error) => console.error('Error al actualizar empleado', error)
      );
    } else {
      this.empleadoService.createEmpleado(empleado).subscribe(
        () => {
          this.cargarEmpleados();
          this.cerrarModal();
        },
        (error) => console.error('Error al crear empleado', error)
      );
    }
  }

  editarEmpleado(empleado: Empleado): void {
    this.empleadoEditando = { ...empleado };
    this.mostrarModal = true;
  }

  eliminarEmpleado(id?: number): void {
    if (id === undefined) return;
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe(
        () => this.cargarEmpleados(),
        (error) => console.error('Error al eliminar empleado', error)
      );
    }
  }

  // Getters y setters para el formulario (usa binding bidireccional)
  get nombre(): string {
    return this.empleadoEditando ? this.empleadoEditando.nombre : this.nuevoEmpleado.nombre;
  }
  set nombre(value: string) {
    if (this.empleadoEditando) this.empleadoEditando.nombre = value;
    else this.nuevoEmpleado.nombre = value;
  }

  get cargo(): string {
    return this.empleadoEditando ? this.empleadoEditando.cargo : this.nuevoEmpleado.cargo;
  }
  set cargo(value: string) {
    if (this.empleadoEditando) this.empleadoEditando.cargo = value;
    else this.nuevoEmpleado.cargo = value;
  }

  get hospitalId(): number {
    return this.empleadoEditando ? this.empleadoEditando.hospitalId : this.nuevoEmpleado.hospitalId;
  }
  set hospitalId(value: number) {
    if (this.empleadoEditando) this.empleadoEditando.hospitalId = value;
    else this.nuevoEmpleado.hospitalId = value;
  }

  private mapearEmpleado(empleado: any): Empleado {
    return {
      id: empleado.id,
      nombre: empleado.nombre,
      cargo: empleado.cargo,
      hospitalId: empleado.hospitalId ?? empleado.hospital_id,
      hospitalNombre: empleado.hospitalNombre ?? empleado.hospital_nombre
    };
  }
}
