package com.espe.cursos.services;

import com.espe.cursos.clients.UsuarioClientRest;
import com.espe.cursos.model.entities.Curso;
import com.espe.cursos.model.entities.CursoUsuario;
import com.espe.cursos.model.entities.Usuario;
import com.espe.cursos.repositories.CursoUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.espe.cursos.repositories.CursoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CursoServiceImpl implements CursoService {

    @Autowired
    private CursoRepository repository;
    @Autowired
    private CursoUsuarioRepository cursoUsuarioRepository;
    @Autowired
    private UsuarioClientRest clientRest;

    public List<Curso> findAll() {
        return (List<Curso>) repository.findAll();
    }

    @Override
    public Optional<Curso> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Curso save(Curso curso) {
        return repository.save(curso);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);

    }

    @Override
    public Optional<Usuario> addUser(Usuario usuario, Long cursoId) {
        Optional<Curso> optional = repository.findById(cursoId);
        if (optional.isPresent()) {
            Usuario usuarioTemp = clientRest.findById(usuario.getId()); // Obtén el usuario desde el microservicio

            Curso curso = optional.get();
            CursoUsuario cursoUsuario = new CursoUsuario();

            // Asignar curso_id y usuario_id correctamente
            cursoUsuario.setCursoId(cursoId);
            cursoUsuario.setUsuarioId(usuarioTemp.getId());

            curso.addCursoUsuario(cursoUsuario); // Añadir el CursoUsuario a la lista del curso
            repository.save(curso); // Guardar el curso actualizado

            return Optional.of(usuarioTemp);
        }
        return Optional.empty();
    }
    @Override
    public Optional<Usuario> removeUser(Long cursoId, Long usuarioId) {
        // Busca el registro de la tabla cursos_usuarios
        Optional<CursoUsuario> cursoUsuarioOptional = cursoUsuarioRepository.findByCursoIdAndUsuarioId(cursoId, usuarioId);

        if (cursoUsuarioOptional.isPresent()) {
            // Llama al microservicio para obtener la información del usuario
            Usuario usuarioTemp = clientRest.findById(usuarioId);

            // Elimina el registro de la relación curso-usuario
            cursoUsuarioRepository.delete(cursoUsuarioOptional.get());

            // Retorna el usuario eliminado
            return Optional.of(usuarioTemp);
        }

        return Optional.empty(); // Curso o Usuario no encontrado
    }



}
