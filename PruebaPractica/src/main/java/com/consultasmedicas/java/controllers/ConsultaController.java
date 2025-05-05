package com.consultasmedicas.java.controllers;

import com.consultasmedicas.java.dtos.ConsultaDTO;
import com.consultasmedicas.java.models.Consulta;
import com.consultasmedicas.java.models.Paciente;
import com.consultasmedicas.java.repositories.ConsultaRepository;
import com.consultasmedicas.java.repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.consultasmedicas.java.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {
    @Autowired
    private ConsultaRepository consultaRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public ResponseEntity<List<Consulta>> getAll() {
        List<Consulta> consultas = consultaRepository.findAll();
        return new ResponseEntity<>(consultas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consulta> getById(@PathVariable Long id) {
        return consultaRepository.findById(id)
                .map(consulta -> new ResponseEntity<>(consulta, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Consulta> create(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ConsultaDTO dto) {

        if (dto.hospitalId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El campo hospitalId es obligatorio");
        }

        String token = authHeader.replace("Bearer ", "");
        Long medicoId = jwtService.extractMedicoId(token);

        if (medicoId == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No se pudo extraer médicoId del token");
        }

        // 🔍 Busca el paciente por ID
        Paciente paciente = pacienteRepository.findById(dto.pacienteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente no encontrado"));

        // 🔧 Mapea manualmente el DTO a la entidad
        Consulta consulta = new Consulta();
        consulta.setFecha(LocalDateTime.parse(dto.fecha));
        consulta.setDiagnostico(dto.diagnostico);
        consulta.setTratamiento(dto.tratamiento);
        consulta.setHospitalId(dto.hospitalId);
        consulta.setMedicoId(medicoId);
        consulta.setPaciente(paciente);

        Consulta consultaGuardada = consultaRepository.save(consulta);
        return new ResponseEntity<>(consultaGuardada, HttpStatus.CREATED);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Consulta> update(@PathVariable Long id, @RequestBody Consulta consulta) {
        if (!consultaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Consulta con ID " + id + " no encontrada");
        }
        consulta.setId(id);
        // Asegúrate de que el hospitalId no se modifique aquí, o permite la modificación si es necesario
        Consulta consultaActualizada = consultaRepository.save(consulta);
        return new ResponseEntity<>(consultaActualizada, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!consultaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Consulta con ID " + id + " no encontrada");
        }
        consultaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/reportes/consultas/por-medico/{id}")
    public ResponseEntity<List<Consulta>> getConsultasPorMedico(@PathVariable Long id) {
        List<Consulta> consultas = consultaRepository.findByMedicoId(id);
        if (consultas.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(consultas, HttpStatus.OK);
    }

    @GetMapping("/por-hospital/{hospitalId}")
    public ResponseEntity<List<Consulta>> getByHospitalId(@PathVariable String hospitalId) {
        List<Consulta> consultas = consultaRepository.findByHospitalId(hospitalId);
        return new ResponseEntity<>(consultas, HttpStatus.OK);
    }

    @GetMapping("/por-usuario")
    public ResponseEntity<List<Consulta>> getConsultasPorUsuario(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String rol = jwtService.extractRol(token);

        if ("admin".equalsIgnoreCase(rol)) {
            return new ResponseEntity<>(consultaRepository.findAll(), HttpStatus.OK);
        }

        Long medicoId = jwtService.extractMedicoId(token);
        List<Consulta> consultas = consultaRepository.findByMedicoId(medicoId);
        return new ResponseEntity<>(consultas, HttpStatus.OK);
    }


}