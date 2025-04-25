package com.consultasmedicas.java.dtos;

public class PacienteDTO {
    public Long id;
    public String nombre;
    public int edad;
    public String historial;

    public PacienteDTO() {}

    public PacienteDTO(Long id, String nombre, int edad, String historial) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.historial = historial;
    }
}
