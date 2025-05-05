export interface Consulta {
  id?: number;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  hospitalId: string;
  pacienteId: number;
  medicoId?: number;
  paciente?: {
    id: number;
    nombre: string;
    edad: number;
    historial: string;
  };
}
