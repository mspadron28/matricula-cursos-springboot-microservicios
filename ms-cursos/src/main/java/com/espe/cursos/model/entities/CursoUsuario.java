package com.espe.cursos.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "cursos_usuarios", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"curso_id", "usuario_id"}) // Asegura la unicidad por combinación
})
public class CursoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="curso_id", nullable = false)
    private Long cursoId;

    @Column(name="usuario_id", nullable = false)
    private Long usuarioId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}

