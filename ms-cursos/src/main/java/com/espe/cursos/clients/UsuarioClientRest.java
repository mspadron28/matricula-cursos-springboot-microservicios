package com.espe.cursos.clients;

import com.espe.cursos.model.entities.Usuario;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@FeignClient(name = "estudiantes", url = "estudiantes-app:8003/api/")
public interface UsuarioClientRest {

    @GetMapping("/estudiantes")
    List<Usuario> listarUsuarios();

    @GetMapping("/estudiantes/{id}")
    Usuario findById(@PathVariable("id") Long id);

    @PostMapping("/estudiantes")
    Usuario crearUsuario(@RequestBody Usuario usuario);

    @DeleteMapping("/estudiantes/{id}")
    void eliminarUsuario(@PathVariable("id") Long id);
}
