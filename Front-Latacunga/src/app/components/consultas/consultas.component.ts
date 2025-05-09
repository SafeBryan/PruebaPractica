import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consulta.service';
import { PacienteService } from '../../services/paciente.service';
import { Consulta } from '../../models/consulta.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
})
export class ConsultasComponent implements OnInit {
  consultas: any[] = [];
  pacientes: any[] = [];
  hospitalId = 'a5dacef5-9fe4-4b1a-89dc-ea9d8a1bed60'; // Hospital Central fijo

  nuevoConsulta: Consulta = {
    fecha: '',
    diagnostico: '',
    tratamiento: '',
    hospitalId: this.hospitalId,
    medicoId: 1, // puedes dejar un valor por defecto si es requerido
    pacienteId: 0,
  };

  constructor(
    private consultasService: ConsultasService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarConsultas();
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
    this.consultasService.getConsultasPorUsuario().subscribe({
      next: (data) => {
        this.consultas = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar consultas', err);
        this.consultas = [];
      },
    });
  }

  enviarConsulta(): void {
    this.nuevoConsulta.hospitalId = this.hospitalId;

    this.consultasService.enviarConsulta(this.nuevoConsulta).subscribe({
      next: () => {
        console.log('✅ Consulta enviada exitosamente');
        this.cargarConsultas();
        this.resetForm();
      },
      error: (err) => console.error('❌ Error al enviar consulta', err),
    });
  }

  resetForm(): void {
    this.nuevoConsulta = {
      fecha: '',
      diagnostico: '',
      tratamiento: '',
      hospitalId: this.hospitalId,
      medicoId: 1,
      pacienteId: 0,
    };
  }
}
