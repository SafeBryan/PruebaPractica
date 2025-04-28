import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../..//models/empleado.model'; // Asegúrate de que la ruta sea correcta
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  imports: [  
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  nuevoEmpleado: Empleado = { nombre: '', cargo: '', hospitalId: 0 };
  selectedEmpleado: Empleado | null = null;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error al cargar empleados', error);
      }
    );
  }

  onSubmit(): void {
    if (this.selectedEmpleado) {
      // Verificar que el ID esté definido antes de intentar actualizar
      if (this.selectedEmpleado.id !== undefined) {
        // Actualizar empleado
        const updatedEmpleado: Empleado = {
          nombre: this.selectedEmpleado.nombre || '',
          cargo: this.selectedEmpleado.cargo || '',
          hospitalId: this.selectedEmpleado.hospitalId ?? 0 // aseguramos que no sea undefined
        };

        this.empleadoService.updateEmpleado(this.selectedEmpleado.id, updatedEmpleado).subscribe(
          () => {
            console.log('Empleado actualizado exitosamente');
            this.cargarEmpleados();
            this.resetForm();
          },
          (error) => {
            console.error('Error al actualizar empleado', error);
          }
        );
      } else {
        console.error('El id del empleado no está definido');
      }
    } else {
      // Crear nuevo empleado
      this.empleadoService.createEmpleado(this.nuevoEmpleado).subscribe(
        () => {
          console.log('Empleado creado exitosamente');
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
    this.selectedEmpleado = { ...empleado }; // Hacemos una copia para no modificar directo
  }

  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe(
        () => {
          console.log('Empleado eliminado exitosamente');
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
    return this.selectedEmpleado ? this.selectedEmpleado.nombre : this.nuevoEmpleado.nombre;
  }
  
  set nombre(value: string) {
    if (this.selectedEmpleado) {
      this.selectedEmpleado.nombre = value;
    } else {
      this.nuevoEmpleado.nombre = value;
    }
  }
  
  get cargo(): string {
    return this.selectedEmpleado ? this.selectedEmpleado.cargo : this.nuevoEmpleado.cargo;
  }
  
  set cargo(value: string) {
    if (this.selectedEmpleado) {
      this.selectedEmpleado.cargo = value;
    } else {
      this.nuevoEmpleado.cargo = value;
    }
  }
  
  get hospitalId(): number {
    return this.selectedEmpleado ? this.selectedEmpleado.hospitalId : this.nuevoEmpleado.hospitalId;
  }
  
  set hospitalId(value: number) {
    if (this.selectedEmpleado) {
      this.selectedEmpleado.hospitalId = value;
    } else {
      this.nuevoEmpleado.hospitalId = value;
    }
  }
}
