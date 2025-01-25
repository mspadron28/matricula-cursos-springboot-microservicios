package com.espe.cursos.services;

import com.espe.cursos.model.entities.Curso;
import com.espe.cursos.model.entities.Usuario;

import java.util.List;
import java.util.Optional;

public interface CursoService {

    List<Curso> findAll();
    Optional<Curso> findById(Long id);
    Curso save(Curso curso);
    void deleteById(Long id);
    Optional<Usuario> addUser(Usuario usuario, Long id);
    // Nuevo método para desmatricular
    public Optional<Usuario> removeUser(Long cursoId, Long usuarioId);

}
