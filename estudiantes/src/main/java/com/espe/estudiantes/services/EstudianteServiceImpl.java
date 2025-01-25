package com.espe.estudiantes.services;

import com.espe.estudiantes.model.entities.Estudiante;
import com.espe.estudiantes.repositories.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteServiceImpl implements EstudianteService {

    @Autowired
    private EstudianteRepository repository;

    @Override
    public List<Estudiante> findAll() {
        return (List<Estudiante>) repository.findAll();
    }

    @Override
    public Optional<Estudiante> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Estudiante save(Estudiante reserva) {
        return repository.save(reserva);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
