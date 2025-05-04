import { Component, OnInit } from '@angular/core';
import { ConsultasService, Consulta } from '../../services/consulta.service';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { MedicoService } from '../../services/medico.service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit {
  consultas: any[] = [];
  medicos: any[] = [];
  pacientes: any[] = [];
  hospitales: Hospital[] = [];
  hospitalIdSeleccionado: string = '';

  nuevoConsulta: Consulta = {
    fecha: '',
    diagnostico: '',
    tratamiento: '',
    medicoId: 0,
    pacienteId: 0,
  };

  constructor(
    private consultasService: ConsultasService,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.cargarMedicos();
    this.cargarPacientes();
  }

  cargarHospitales(): void {
    this.hospitalService.getHospitales().subscribe(
      (data) => {
        this.hospitales = data;
      },
      (error) => {
        console.error('❌ Error al cargar hospitales', error);
      }
    );
  }

  cargarMedicos(): void {
    if (!this.hospitalIdSeleccionado) return;
    this.medicoService
      .getMedicosByHospital(this.hospitalIdSeleccionado)
      .subscribe({
        next: (data) => {
          this.medicos = data;
        },
        error: (err) => console.error('❌ Error al cargar médicos', err),
      });
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => console.error('❌ Error al cargar pacientes', err),
    });
  }

  cargarConsultas(): void {
    if (!this.hospitalIdSeleccionado) {
      console.error('Debe seleccionar un hospital.');
      return;
    }

    this.consultasService
      .getConsultasExternas(this.hospitalIdSeleccionado)
      .subscribe(
        (data) => {
          this.consultas = data;
        },
        (error) => {
          console.error('❌ Error al cargar consultas', error);
          this.consultas = [];
        }
      );
  }

  enviarConsulta(): void {
    if (!this.hospitalIdSeleccionado) {
      console.error('Debe seleccionar un hospital.');
      return;
    }

    const consultaConHospital = {
      ...this.nuevoConsulta,
      hospitalId: this.hospitalIdSeleccionado,
    };

    this.consultasService
      .enviarConsulta(this.hospitalIdSeleccionado, consultaConHospital)
      .subscribe(
        () => {
          console.log('✅ Consulta enviada exitosamente');
          this.cargarConsultas();
          this.resetForm();
        },
        (error) => {
          console.error('❌ Error al enviar consulta', error);
        }
      );
  }

  resetForm(): void {
    this.nuevoConsulta = {
      fecha: '',
      diagnostico: '',
      tratamiento: '',
      medicoId: 0,
      pacienteId: 0,
    };
  }

  onHospitalSeleccionado(): void {
    if (this.hospitalIdSeleccionado) {
      this.cargarMedicos();
      this.cargarPacientes();
      this.consultas = [];
      this.resetForm();
    }
  }

  compararPorId = (a: any, b: any) => a === b;

  
}
