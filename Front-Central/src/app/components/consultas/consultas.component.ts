import { Component, OnInit } from '@angular/core';
import { ConsultasService, Consulta } from '../../services/consulta.service';
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
  nuevoConsulta: Consulta = {
    fecha: '',
    diagnostico: '',
    tratamiento: '',
    medicoId: '',
    pacienteId: '',
  };
  hospitalIdSeleccionado: string = '';

  constructor(private consultasService: ConsultasService) {}

  ngOnInit(): void {
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
          console.error('Error al cargar consultas', error);
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
          console.log('Consulta enviada exitosamente');
          this.cargarConsultas(); // Recargar consultas
          this.resetForm();
        },
        (error) => {
          console.error('Error al enviar consulta', error);
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
