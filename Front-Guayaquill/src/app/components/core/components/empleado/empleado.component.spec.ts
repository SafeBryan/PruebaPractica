import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../../services/empleado.service';
import { Empleado } from '../../../../models/empleado.model';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleados: Empleado[] = [];
  newEmpleado: Empleado = { nombre: '', cargo: '', hospitalId: '' };
  editEmpleado: Empleado | null = null;

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  // Obtener todos los empleados
  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error al obtener empleados:', error);
      }
    );
  }

  // Crear un nuevo empleado
  crearEmpleado(): void {
    if (!this.newEmpleado.nombre || !this.newEmpleado.cargo || !this.newEmpleado.hospitalId) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.empleadoService.createEmpleado(this.newEmpleado).subscribe(
      (data) => {
        this.getEmpleados();
        this.newEmpleado = { nombre: '', cargo: '', hospitalId: '' }; // Limpiar el formulario
      },
      (error) => {
        console.error('Error al crear empleado:', error);
      }
    );
  }

  // Eliminar un empleado
  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe(
        () => {
          this.getEmpleados(); // Refrescar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar empleado:', error);
        }
      );
    }
  }

  // Iniciar la edición de un empleado
  editarEmpleado(empleado: Empleado): void {
    this.editEmpleado = { ...empleado };
  }

  // Actualizar un empleado
  actualizarEmpleado(): void {
    if (this.editEmpleado) {
      this.empleadoService.updateEmpleado(this.editEmpleado.id, this.editEmpleado).subscribe(
        () => {
          this.getEmpleados();
          this.editEmpleado = null; // Limpiar el formulario de edición
        },
        (error) => {
          console.error('Error al actualizar empleado:', error);
        }
      );
    }
  }

  // Cancelar la edición
  cancelarEdicion(): void {
    this.editEmpleado = null;
  }
}
