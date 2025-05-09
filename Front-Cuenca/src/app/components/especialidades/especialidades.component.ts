import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../services/especialidad.service';
import { Especialidad } from '../../models/especialidad.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [  
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {
  especialidades: Especialidad[] = [];
  nuevaEspecialidad: Especialidad = { nombre: '' };
  selectedEspecialidad: Especialidad | null = null;

  constructor(private especialidadService: EspecialidadService) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al cargar especialidades', error);
      }
    );
  }

  onSubmit(): void {
    if (this.selectedEspecialidad) {
      if (this.selectedEspecialidad.id !== undefined) {
        // Actualizar especialidad
        const updatedEspecialidad: Especialidad = {
          nombre: this.selectedEspecialidad.nombre
        };

        this.especialidadService.updateEspecialidad(this.selectedEspecialidad.id, updatedEspecialidad).subscribe(
          () => {
            console.log('Especialidad actualizada exitosamente');
            this.cargarEspecialidades();
            this.resetForm();
          },
          (error) => {
            console.error('Error al actualizar especialidad', error);
          }
        );
      } else {
        console.error('El id de la especialidad no está definido');
      }
    } else {
      // Crear nueva especialidad
      this.especialidadService.createEspecialidad(this.nuevaEspecialidad).subscribe(
        () => {
          console.log('Especialidad creada exitosamente');
          this.cargarEspecialidades();
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear especialidad', error);
        }
      );
    }
  }

  editarEspecialidad(especialidad: Especialidad): void {
    this.selectedEspecialidad = { ...especialidad };
  }

  eliminarEspecialidad(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta especialidad?')) {
      this.especialidadService.deleteEspecialidad(id).subscribe(
        () => {
          console.log('Especialidad eliminada exitosamente');
          this.cargarEspecialidades();
        },
        (error) => {
          console.error('Error al eliminar especialidad', error);
        }
      );
    }
  }

  resetForm(): void {
    this.nuevaEspecialidad = { nombre: '' };
    this.selectedEspecialidad = null;
  }

  // Getters y setters para manejar formulario
  get nombre(): string {
    return this.selectedEspecialidad ? this.selectedEspecialidad.nombre : this.nuevaEspecialidad.nombre;
  }
  
  set nombre(value: string) {
    if (this.selectedEspecialidad) {
      this.selectedEspecialidad.nombre = value;
    } else {
      this.nuevaEspecialidad.nombre = value;
    }
  }
}
