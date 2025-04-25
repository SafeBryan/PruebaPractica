package com.consultasmedicas.java.controllers;

import com.consultasmedicas.java.models.Medico;
import com.consultasmedicas.java.repositories.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/medicos")
public class MedicoController {
    @Autowired
    private MedicoRepository medicoRepository;

    @GetMapping
    public ResponseEntity<List<Medico>> getAll(){
        List<Medico> medicos = medicoRepository.findAll();
        return new ResponseEntity<>(medicos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medico> getById(@PathVariable Long id) {
        return medicoRepository.findById(id)
                .map(medico -> new ResponseEntity<>(medico, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Medico medico){
        Medico medicoGuardado = medicoRepository.save(medico);
        return ResponseEntity.status(HttpStatus.CREATED).body("Medico " + medicoGuardado.getNombre() + " con ID " + medicoGuardado.getId() + " se ha creado con exito");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medico> update(@PathVariable Long id, @RequestBody Medico medico){
        if (!medicoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Medico con ID " + id + " no encontrado");
        }
        medico.setId(id);
        Medico medicoActualizado = medicoRepository.save(medico);
        return new ResponseEntity<>(medicoActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if (!medicoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Medico con ID " + id + " no encontrado");
        }
        medicoRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
