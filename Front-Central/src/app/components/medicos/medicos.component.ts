import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico.model';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [  
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  nuevoMedico: Medico = { nombre: '', especialidadId: 0, hospitalId: 0 };
  selectedMedico: Medico | null = null;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe(
      (data) => {
        this.medicos = data;
      },
      (error) => {
        console.error('Error al cargar médicos', error);
      }
    );
  }

  onSubmit(): void {
    if (this.selectedMedico) {
      if (this.selectedMedico.id !== undefined) {
        const updatedMedico: Medico = {
          nombre: this.selectedMedico.nombre || '',
          especialidadId: this.selectedMedico.especialidadId || 0,
          hospitalId: this.selectedMedico.hospitalId ?? 0
        };

        this.medicoService.updateMedico(this.selectedMedico.id, updatedMedico).subscribe(
          () => {
            console.log('Médico actualizado exitosamente');
            this.cargarMedicos();
            this.resetForm();
          },
          (error) => {
            console.error('Error al actualizar médico', error);
          }
        );
      } else {
        console.error('El id del médico no está definido');
      }
    } else {
      this.medicoService.createMedico(this.nuevoMedico).subscribe(
        () => {
          console.log('Médico creado exitosamente');
          this.cargarMedicos();
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear médico', error);
        }
      );
    }
  }

  editarMedico(medico: Medico): void {
    this.selectedMedico = { ...medico };
  }

  eliminarMedico(id: number): void {
    if (confirm('¿Estás seguro de eliminar este médico?')) {
      this.medicoService.deleteMedico(id).subscribe(
        () => {
          console.log('Médico eliminado exitosamente');
          this.cargarMedicos();
        },
        (error) => {
          console.error('Error al eliminar médico', error);
        }
      );
    }
  }

  resetForm(): void {
    this.nuevoMedico = { nombre: '', especialidadId: 0, hospitalId: 0 };
    this.selectedMedico = null;
  }

  // Getters y Setters para binding del formulario
  get nombre(): string {
    return this.selectedMedico ? this.selectedMedico.nombre : this.nuevoMedico.nombre;
  }

  set nombre(value: string) {
    if (this.selectedMedico) {
      this.selectedMedico.nombre = value;
    } else {
      this.nuevoMedico.nombre = value;
    }
  }

  get especialidad(): string {
    return this.selectedMedico ? String(this.selectedMedico.especialidadId) : String(this.nuevoMedico.especialidadId);
  }

  set especialidad(value: string) {
    if (this.selectedMedico) {
      this.selectedMedico.especialidadId = Number(value);
    } else {
      this.nuevoMedico.especialidadId = Number(value);
    }
  }

  get hospitalId(): number {
    return this.selectedMedico ? this.selectedMedico.hospitalId : this.nuevoMedico.hospitalId;
  }

  set hospitalId(value: number) {
    if (this.selectedMedico) {
      this.selectedMedico.hospitalId = value;
    } else {
      this.nuevoMedico.hospitalId = value;
    }
  }
}
