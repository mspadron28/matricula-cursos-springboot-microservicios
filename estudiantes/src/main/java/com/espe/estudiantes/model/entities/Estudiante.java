package com.espe.estudiantes.model.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.util.Date;

@Entity
@Table(name = "Estudiantes")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "El nombre no puede estar vacío")
    @Column(nullable = false)
    private String nombre;

    @NotEmpty(message = "El apellido no puede estar vacío")
    @Column(nullable = false)
    private String apellido;

    @NotEmpty(message = "El email no puede estar vacío")
    @Email(message = "Debe ser un email válido")
    @Column(nullable = false, unique = true)
    private String email;

    @NotEmpty(message = "El teléfono no puede estar vacío")
    @Column(nullable = false)
    private String telefono;

    @NotNull(message = "La fecha de nacimiento no puede ser nula")
    @Past(message = "La fecha de nacimiento debe estar en el pasado")
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date fechaNacimiento;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    private Date creadoEn;

    @PrePersist
    protected void onCreate() {
        this.creadoEn = new Date();
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Date getCreadoEn() {
        return creadoEn;
    }
}
