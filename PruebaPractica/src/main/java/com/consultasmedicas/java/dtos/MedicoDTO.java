package com.consultasmedicas.java.dtos;

public class MedicoDTO {
    public Long id;
    public String nombre;
    public String especialidad;

    public MedicoDTO() {}

    public MedicoDTO(Long id, String nombre, String especialidad) {
        this.id = id;
        this.nombre = nombre;
        this.especialidad = especialidad;
    }
}
