'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useForm } from 'react-hook-form';
import { createCurso, updateCurso, Curso } from '../../services/cursosService';

interface CrearCursoProps {
  isOpen: boolean;
  onClose: () => void;
  onCursoCreated: () => void;
  curso?: Curso | null;
}

const CrearCurso: React.FC<CrearCursoProps> = ({ isOpen, onClose, onCursoCreated, curso }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Curso>({
    defaultValues: { nombre: '', descripcion: '', creditos: 0 },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efecto para resetear el formulario cuando cambia el curso seleccionado
  useEffect(() => {
    if (curso) {
      reset(curso);
    } else {
      reset({ nombre: '', descripcion: '', creditos: 0 });
    }
  }, [curso, reset]);

  const onSubmit = async (data: Curso) => {
    setIsSubmitting(true);
    try {
      if (curso?.id) {
        // Actualizar curso existente
        await updateCurso(curso.id, data);
      } else {
        // Crear nuevo curso
        await createCurso(data);
      }
      onCursoCreated();
      reset();
      onClose();
    } catch (error) {
      console.error('Error al guardar el curso:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>{curso ? 'Editar Curso' : 'Crear Nuevo Curso'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                {...register('nombre', { required: 'El nombre es obligatorio' })}
                placeholder="Ingresa el nombre del curso"
              />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                {...register('descripcion', { required: 'La descripción es obligatoria' })}
                placeholder="Ingresa la descripción del curso"
              />
              {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
            </div>

            <div>
              <Label htmlFor="creditos">Créditos</Label>
              <Input
                id="creditos"
                type="number"
                {...register('creditos', {
                  required: 'Los créditos son obligatorios',
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || 'El número de créditos debe ser mayor que 0',
                })}
                placeholder="Ingresa los créditos del curso"
              />
              {errors.creditos && <p className="text-red-500 text-sm">{errors.creditos.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-500 text-white hover:bg-green-600" disabled={isSubmitting}>
              {isSubmitting ? (curso ? 'Actualizando...' : 'Creando...') : 'Aceptar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CrearCurso;
