'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FiBook, FiInfo, FiStar } from 'react-icons/fi';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useToast } from "@/hooks/use-toast"

import { getCursoById, assignStudentToCurso, removeStudentFromCurso, Curso } from '@/services/cursosService';
import { getEstudiantes, getEstudianteById, Estudiante } from '@/services/estudiantesService';

export interface EstudianteSelect {
  id?: number;
  nombre: string;
  apellido: string;
}

const CursoPageDetail = () => {
  const { id } = useParams();
  const { toast } = useToast(); // Inicializa el Toast Hook

  const [curso, setCurso] = useState<Curso | null>(null);
  const [estudiantes, setEstudiantes] = useState<EstudianteSelect[]>([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState('');
  const [loadingEstudiantes, setLoadingEstudiantes] = useState(false);
  const [estudiantesMatriculados, setEstudiantesMatriculados] = useState<Estudiante[]>([]);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const cursoData = await getCursoById(Number(id));
        setCurso(cursoData);

        if (cursoData.cursoUsuarios) {
          const matriculados = await Promise.all(
            cursoData.cursoUsuarios.map((cu) => getEstudianteById(cu.usuarioId))
          );
          setEstudiantesMatriculados(matriculados);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'No se pudo cargar el curso.',
          variant: 'destructive',
        });
      }
    };

    fetchCurso();
  }, [id, toast]);

  const handleMostrarEstudiantes = async () => {
    setLoadingEstudiantes(true);
    try {
      const data = await getEstudiantes();
      const estudiantesSelect = data.map((estudiante: EstudianteSelect) => ({
        id: estudiante.id,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
      }));
      setEstudiantes(estudiantesSelect);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo cargar la lista de estudiantes.',
        variant: 'destructive',
      });
    } finally {
      setLoadingEstudiantes(false);
    }
  };

  const handleAsignarEstudiante = async () => {
    if (!selectedEstudiante) return;
    try {
      await assignStudentToCurso(Number(id), Number(selectedEstudiante));
      const nuevoEstudiante = await getEstudianteById(Number(selectedEstudiante));
      setEstudiantesMatriculados((prev) => [...prev, nuevoEstudiante]);
      toast({
        title: 'Éxito',
        description: 'Estudiante matriculado con éxito.',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'El estudiante ya pertenece a este curso.',
        variant: 'destructive',
      });
    }
  };

  const handleDesmatricularEstudiante = async () => {
    if (!selectedEstudiante) return;
    try {
      await removeStudentFromCurso(Number(id), Number(selectedEstudiante));
      setEstudiantesMatriculados((prev) =>
        prev.filter((estudiante) => estudiante.id !== Number(selectedEstudiante))
      );
      toast({
        title: 'Éxito',
        description: 'Estudiante desmatriculado con éxito.',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'No puedes desmatricular a este estudiante.',
        variant: 'destructive',
      });
    }
  };

  if (!curso) {
    return <div>Cargando datos del curso...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center h-screen bg-gray-50 px-4 gap-6">

      {/* Card para gestionar estudiantes */}
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg shadow-lg rounded-lg bg-white p-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <FiBook className="text-4xl text-blue-500" />
              <CardTitle className="text-2xl font-bold">{curso.nombre}</CardTitle>
            </div>
            <CardDescription className="flex items-center gap-4 mt-4 text-gray-700">
              <FiInfo className="text-2xl text-gray-500" />
              {curso.descripcion}
            </CardDescription>
            <CardDescription className="flex items-center gap-4 mt-4 text-gray-700">
              <FiStar className="text-2xl text-yellow-500" />
              Créditos: {curso.creditos}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center mt-4">
            <Button
              onClick={handleMostrarEstudiantes}
              className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg"
            >
              {loadingEstudiantes ? 'Cargando estudiantes...' : 'Gestionar estudiantes'}
            </Button>
          </CardFooter>
        </Card>

        {estudiantes.length > 0 && (
          <div className="w-full max-w-lg mt-8">
            <Select onValueChange={(value) => setSelectedEstudiante(value)}>
              <SelectTrigger className="w-full border border-gray-300 shadow-sm rounded-lg px-4 py-2 focus:ring focus:ring-blue-500 transition-all">
                <span>
                    {selectedEstudiante
                    ? `Seleccionado: ${estudiantes.find((est) => est.id?.toString() === selectedEstudiante)?.nombre} ${estudiantes.find((est) => est.id?.toString() === selectedEstudiante)?.apellido}`
                    : 'Seleccione un estudiante'}
                </span>
              </SelectTrigger>
              <SelectContent>
                {estudiantes.map((estudiante) => (
                  <SelectItem key={estudiante.id ?? ''} value={estudiante.id?.toString() ?? ''}>
                    {estudiante.nombre} {estudiante.apellido}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-between mt-6">
              <Button
                onClick={handleAsignarEstudiante}
                disabled={!selectedEstudiante}
                className="bg-green-500 text-white hover:bg-green-600 px-6 py-3 rounded-lg"
              >
                Matricular
              </Button>
              <Button
                onClick={handleDesmatricularEstudiante}
                disabled={!selectedEstudiante}
                className="bg-red-500 text-white hover:bg-red-600 px-6 py-3 rounded-lg"
              >
                Desmatricular
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Tabla de estudiantes matriculados */}
      <div className="flex flex-col items-center justify-center w-full max-w-lg">
        <Table className="w-full border rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estudiantesMatriculados.map((estudiante) => (
              <TableRow key={estudiante.id}>
                <TableCell>{estudiante.id}</TableCell>
                <TableCell>{estudiante.nombre}</TableCell>
                <TableCell>{estudiante.apellido}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CursoPageDetail;

