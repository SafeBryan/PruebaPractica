package com.consultasmedicas.java.repositories;

import com.consultasmedicas.java.models.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    List<Consulta> findByMedicoId(Long id);
    List<Consulta> findByHospitalId(String hospitalId);
}