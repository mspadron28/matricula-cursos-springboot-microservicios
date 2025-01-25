'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useForm } from 'react-hook-form';
import { createEstudiante, updateEstudiante, Estudiante } from '@/services/estudiantesService';
import { useToast } from '@/hooks/use-toast'; // Importa el hook para usar Toast

interface FormEstudianteProps {
  isOpen: boolean;
  onClose: () => void;
  estudiante?: Estudiante | null;
  onEstudianteUpdated: () => void;
}

const FormEstudiante: React.FC<FormEstudianteProps> = ({ isOpen, onClose, estudiante, onEstudianteUpdated }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Estudiante>({
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      fechaNacimiento: '',
      telefono: '',
    },
  });
  const { toast } = useToast(); // Inicializa el Toast Hook
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualiza los valores del formulario cuando cambia el estudiante seleccionado
  useEffect(() => {
    if (estudiante) {
      reset(estudiante); // Resetea los campos con los datos del estudiante
    } else {
      reset({ // Resetea a los valores vacíos para el formulario de creación
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
        telefono: '',
      });
    }
  }, [estudiante, reset]);

  const onSubmit = async (data: Estudiante) => {
    setIsSubmitting(true);
    try {
      if (estudiante?.id) {
        // Actualiza el estudiante
        await updateEstudiante(estudiante.id, data);
        toast({
          title: 'Éxito',
          description: 'El estudiante se actualizó correctamente.',
          variant: 'default',
        });
      } else {
        // Crea un nuevo estudiante
        await createEstudiante(data);
        toast({
          title: 'Éxito',
          description: 'El estudiante se creó correctamente.',
          variant: 'default',
        });
      }
      onEstudianteUpdated();
      reset();
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Hubo un error al procesar la solicitud.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>{estudiante ? 'Editar Estudiante' : 'Crear Nuevo Estudiante'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                {...register('nombre', {
                  required: 'El nombre no puede estar vacío',
                })}
                placeholder="Ingresa el nombre del estudiante"
              />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
            </div>

            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                {...register('apellido', {
                  required: 'El apellido no puede estar vacío',
                })}
                placeholder="Ingresa el apellido del estudiante"
              />
              {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'El email no puede estar vacío',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Debe ser un email válido',
                  },
                })}
                placeholder="Ingresa el email del estudiante"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <Input
                id="fechaNacimiento"
                type="date"
                {...register('fechaNacimiento', {
                  required: 'La fecha de nacimiento no puede estar vacía',
                  validate: (value) => {
                    const date = new Date(value);
                    return date < new Date() || 'La fecha debe estar en el pasado';
                  },
                })}
              />
              {errors.fechaNacimiento && <p className="text-red-500 text-sm">{errors.fechaNacimiento.message}</p>}
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                {...register('telefono', {
                  required: 'El teléfono no puede estar vacío',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'El teléfono debe tener exactamente 10 dígitos',
                  },
                })}
                placeholder="Ingresa el teléfono del estudiante"
              />
              {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-500 text-white hover:bg-green-600" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Aceptar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormEstudiante;
