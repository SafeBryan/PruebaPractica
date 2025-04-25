package com.consultasmedicas.java.repositories;

import com.consultasmedicas.java.models.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Long> { }
