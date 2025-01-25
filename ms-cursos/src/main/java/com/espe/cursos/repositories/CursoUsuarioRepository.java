package com.espe.cursos.repositories;

import com.espe.cursos.model.entities.CursoUsuario;
import feign.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CursoUsuarioRepository extends CrudRepository<CursoUsuario, Long>{

    @Query("SELECT cu FROM CursoUsuario cu WHERE cu.cursoId = :cursoId AND cu.usuarioId = :usuarioId")
    Optional<CursoUsuario> findByCursoIdAndUsuarioId(@Param("cursoId") Long cursoId, @Param("usuarioId") Long usuarioId);
}
