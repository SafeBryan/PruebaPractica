package com.consultasmedicas.java.repositories;

import com.consultasmedicas.java.models.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> { }
