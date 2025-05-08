import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  pacienteForm: Paciente = { nombre: '', edad: 0, historial: '' };
  pacienteSeleccionado: Paciente | null = null;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar pacientes', err);
      },
    });
  }

  guardarPaciente(): void {
    if (this.pacienteSeleccionado) {
      // Actualizar paciente existente
      this.pacienteService
        .actualizarPaciente(this.pacienteSeleccionado.id!, this.pacienteForm)
        .subscribe({
          next: () => {
            this.cargarPacientes();
            this.resetForm();
          },
          error: (err) => {
            console.error('❌ Error al actualizar paciente', err);
          },
        });
    } else {
      // Crear nuevo paciente
      this.pacienteService.crearPaciente(this.pacienteForm).subscribe({
        next: () => {
          this.cargarPacientes();
          this.resetForm();
        },
        error: (err) => {
          console.error('❌ Error al crear paciente', err);
        },
      });
    }
  }

  editarPaciente(paciente: Paciente): void {
    this.pacienteSeleccionado = paciente;
    this.pacienteForm = { ...paciente };
  }

  eliminarPaciente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.pacienteService.eliminarPaciente(id).subscribe({
        next: () => this.cargarPacientes(),
        error: (err) => {
          console.error('❌ Error al eliminar paciente', err);
        },
      });
    }
  }

  resetForm(): void {
    this.pacienteForm = { nombre: '', edad: 0, historial: '' };
    this.pacienteSeleccionado = null;
  }
}
