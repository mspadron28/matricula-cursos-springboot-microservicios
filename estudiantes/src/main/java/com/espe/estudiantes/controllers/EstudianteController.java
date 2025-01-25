package com.espe.estudiantes.controllers;

import com.espe.estudiantes.model.entities.Estudiante;
import com.espe.estudiantes.services.EstudianteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/estudiantes")
public class EstudianteController {

    @Autowired
    private EstudianteService service;

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Estudiante estudiante, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(
                    err -> errores.put(
                            err.getField(), err.getDefaultMessage()
                    )
            );
            return ResponseEntity.badRequest().body(errores);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(estudiante));
    }

    @GetMapping
    public List<Estudiante> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> getById(@PathVariable Long id) {
        Optional<Estudiante> estudianteOptional = service.findById(id);
        if (estudianteOptional.isPresent()) {
            return ResponseEntity.ok(estudianteOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Estudiante estudiante, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(
                    err -> errores.put(
                            err.getField(), err.getDefaultMessage()
                    )
            );
            return ResponseEntity.badRequest().body(errores);
        }
        Optional<Estudiante> estudianteOptional = service.findById(id);
        if (estudianteOptional.isPresent()) {
            Estudiante estudianteDB = estudianteOptional.get();
            estudianteDB.setNombre(estudiante.getNombre());
            estudianteDB.setApellido(estudiante.getApellido());
            estudianteDB.setEmail(estudiante.getEmail());
            estudianteDB.setTelefono(estudiante.getTelefono());
            estudianteDB.setFechaNacimiento(estudiante.getFechaNacimiento());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(estudianteDB));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
