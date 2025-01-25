package com.espe.cursos.model.entities;

import jakarta.persistence.PrePersist;

import java.util.Date;

public class Usuario {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private Date fechaNacimiento;
    private Date creadoEn;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}

    public String getApellido() {return apellido;}
    public void setApellido(String apellido) {this.apellido = apellido;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getTelefono() {return telefono;}
    public void setTelefono(String telefono) {this.telefono = telefono;}
    public Date getFechaNacimiento() {return fechaNacimiento;}
    //Setter creadoEn
    // ejecutará automáticamente justo antes de que la entidad sea persistida en la base de datos.
    @PrePersist
    protected void onCreate() {this.creadoEn = new Date();}

    public Date getCreadoEn() {return creadoEn;}


}
