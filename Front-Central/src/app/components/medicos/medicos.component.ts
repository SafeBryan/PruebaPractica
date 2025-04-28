import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico.model';
import { EspecialidadService } from '../../services/especialidad.service';
import { HospitalService } from '../../services/hospital.service';
import { Especialidad } from '../../models/especialidad.model';
import { Hospital } from '../../models/hospital.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  especialidades: Especialidad[] = [];
  hospitales: Hospital[] = [];
  nuevoMedico: Medico = { nombre: '', especialidadId: 0, hospitalId: 0 };
  selectedMedico: Medico | null = null;

  constructor(
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.cargarEspecialidades();
    this.cargarHospitales();
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe(
      (data) => {
        this.medicos = data.map((medico) => this.mapearMedico(medico));
      },
      (error) => {
        console.error('Error al cargar médicos', error);
      }
    );
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
    if (this.selectedMedico) {
      if (this.selectedMedico.id !== undefined) {
        const updatedMedico: Medico = {
          nombre: this.selectedMedico.nombre,
          especialidadId: this.selectedMedico.especialidadId,
          hospitalId: this.selectedMedico.hospitalId,
        };
        this.medicoService
          .updateMedico(this.selectedMedico.id, updatedMedico)
          .subscribe(
            () => {
              this.cargarMedicos();
              this.resetForm();
            },
            (error) => {
              console.error('Error al actualizar médico', error);
            }
          );
      }
    } else {
      this.medicoService.createMedico(this.nuevoMedico).subscribe(
        () => {
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

  get nombre(): string {
    return this.selectedMedico
      ? this.selectedMedico.nombre
      : this.nuevoMedico.nombre;
  }
  set nombre(value: string) {
    if (this.selectedMedico) this.selectedMedico.nombre = value;
    else this.nuevoMedico.nombre = value;
  }

  get especialidad(): number {
    return this.selectedMedico
      ? this.selectedMedico.especialidadId
      : this.nuevoMedico.especialidadId;
  }
  set especialidad(value: number) {
    if (this.selectedMedico) this.selectedMedico.especialidadId = value;
    else this.nuevoMedico.especialidadId = value;
  }

  get hospitalId(): number {
    return this.selectedMedico
      ? this.selectedMedico.hospitalId
      : this.nuevoMedico.hospitalId;
  }
  set hospitalId(value: number) {
    if (this.selectedMedico) this.selectedMedico.hospitalId = value;
    else this.nuevoMedico.hospitalId = value;
  }


  private mapearMedico(medico: any): Medico {
    return {
      id: medico.id,
      nombre: medico.nombre,
      especialidadId: medico.especialidadId ?? medico.especialidad_id,
      especialidadNombre:
        medico.especialidadNombre ?? medico.especialidad_nombre,
      hospitalId: medico.hospitalId ?? medico.hospital_id,
      hospitalNombre: medico.hospitalNombre ?? medico.hospital_nombre,
    };
  }
}
