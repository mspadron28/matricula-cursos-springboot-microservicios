package com.espe.cursos.controllers;

import com.espe.cursos.model.entities.Curso;
import com.espe.cursos.model.entities.Usuario;
import com.espe.cursos.services.CursoService;
import feign.FeignException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("api/cursos")
public class CursoController  {
    //Instanciar el servicio cunando se necesite y liberar memoria
    @Autowired
    private CursoService service;



    @PostMapping
    //Devolver un objeto generico en caso de que la app se caiga
    public ResponseEntity<?> crear(@RequestBody Curso curso) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(curso));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Curso curso, BindingResult result) {
        // Validar si hay errores en el cuerpo de la solicitud
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(
                    err -> errores.put(
                            err.getField(), err.getDefaultMessage()
                    )
            );
            return ResponseEntity.badRequest().body(errores);
        }

        // Buscar el curso por ID
        Optional<Curso> cursoOptional = service.findById(id);
        if (cursoOptional.isPresent()) {
            // Obtener el curso de la base de datos
            Curso cursoDB = cursoOptional.get();

            // Actualizar los campos del curso
            cursoDB.setNombre(curso.getNombre());
            cursoDB.setDescripcion(curso.getDescripcion());
            cursoDB.setCreditos(curso.getCreditos());

            // Guardar los cambios
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(cursoDB));
        }

        // Si no se encuentra el curso, devolver un 404
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Curso> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> getById(@PathVariable Long id) {
        Optional<Curso> cursoOptional = service.findById(id);
        if (cursoOptional.isPresent()) {
            return ResponseEntity.ok(cursoOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Curso> cursoOptional = service.findById(id);
        if (cursoOptional.isPresent()) {
            // Llamar al servicio para eliminar el curso
            service.deleteById(id);
            // Retornar una respuesta HTTP 204 (No Content) si se elimina correctamente
            return ResponseEntity.noContent().build();
        }
        // Si no se encuentra el curso, retornar una respuesta HTTP 404 (Not Found)
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "Curso no encontrado"));
    }


    @PostMapping("/{id}")
    public ResponseEntity<?> agregarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> optional;
        try {
            optional = service.addUser(usuario, id);
        } catch (FeignException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("Error", "Usuario o curso no encontrado" + ex.getMessage()));
        }
        if (optional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(optional.get());
        }
        return ResponseEntity.notFound().build();
    }



    @DeleteMapping("/{cursoId}/usuario/{usuarioId}")
    public ResponseEntity<?> desmatricularUsuario(
            @PathVariable Long cursoId, @PathVariable Long usuarioId) {

        Optional<Usuario> usuarioEliminado = service.removeUser(cursoId, usuarioId);

        if (usuarioEliminado.isPresent()) {
            // Si se elimina con éxito, responde con la información del usuario eliminado
            return ResponseEntity.ok(Collections.singletonMap("Usuario desmatricualdo", usuarioEliminado.get()));
        }

        // Si no se encuentra el curso o el usuario, responde con un error
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("Error", "Curso o usuario no encontrado"));
    }




}
