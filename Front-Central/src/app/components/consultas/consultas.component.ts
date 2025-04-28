import { Component, OnInit } from '@angular/core';
import { ConsultasService, Consulta } from '../../services/consulta.service';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../models/hospital.model'; // Asegúrate que este modelo exista
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
  hospitales: Hospital[] = []; // ⬅️ Lista de hospitales para el combo
  hospitalIdSeleccionado: string = ''; // ⬅️ ID seleccionado del combo
  nuevoConsulta: Consulta = {
    fecha: '',
    diagnostico: '',
    tratamiento: '',
    medicoId: '',
    pacienteId: '',
  };

  constructor(
    private consultasService: ConsultasService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(): void {
    this.hospitalService.getHospitales().subscribe(
      (data) => {
        console.log('✅ Hospitales cargados:', data);
        this.hospitales = data;
      },
      (error) => {
        console.error('❌ Error al cargar hospitales', error);
      }
    );
  }

  cargarConsultas(): void {
    if (!this.hospitalIdSeleccionado) {
      console.error('Debe seleccionar un hospital.');
      return;
    }

    console.log(
      '➡️ Cargando consultas para hospital:',
      this.hospitalIdSeleccionado
    );

    this.consultasService
      .getConsultasExternas(this.hospitalIdSeleccionado)
      .subscribe(
        (data) => {
          console.log('✅ Consultas recibidas:', data);
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

    this.consultasService
      .enviarConsulta(this.hospitalIdSeleccionado, this.nuevoConsulta)
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
      medicoId: '',
      pacienteId: '',
    };
  }
}
