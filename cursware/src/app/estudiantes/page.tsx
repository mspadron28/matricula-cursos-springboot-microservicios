"use client";

import { useEffect, useState } from "react";
import {
  FiUser,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiUserMinus,
  FiUsers,
  FiUserPlus,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  getEstudiantes,
  deleteEstudiante,
  Estudiante,
} from "@/services/estudiantesService";
import FormEstudiante from "../ui/FormEstudiante";
import { toast } from "@/hooks/use-toast";
import { Curso, getCursos } from "@/services/cursosService";
//import FormEstudiante from '../ui/FormEstudiante';

const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] =
    useState<Estudiante | null>(null);

  const fetchEstudiantes = async () => {
    const data = await getEstudiantes();
    setEstudiantes(data);
  };

  
  const handleDelete = async (id: number) => {
    try {
      // Fetch all courses
      const cursos: Curso[] = await getCursos();

      // Check if the student is enrolled in any course
      const isEnrolled = cursos.some((curso) =>
        curso.cursoUsuarios?.some((usuario) => usuario.usuarioId === id)
      );

      if (isEnrolled) {
        toast({
          title: "Error",
          description: "El estudiante está matriculado en un curso y no puede ser eliminado.",
          variant: "destructive",
        });
        return;
      }

      // Confirm deletion
      if (confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
        await deleteEstudiante(id);
        toast({
          title: "Éxito",
          description: "El estudiante se eliminó correctamente.",
          variant: "default",
        });
        fetchEstudiantes();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Hubo un problema al eliminar el estudiante.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (estudiante: Estudiante) => {
    setSelectedEstudiante(estudiante);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedEstudiante(null);
    setShowForm(true);
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Encabezado principal */}
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FiUser className="text-cyan-500" /> Gestión Estudiantes
        </h1>
      </header>

      {/* Sección general */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primera subsección (lado izquierdo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
          {/* Encabezado */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Bienvenido a la administración de estudiantes
            </h2>
            <p className="text-lg text-gray-600">
              Aquí puedes gestionar los estudiantes registrados en la
              plataforma.
            </p>
          </div>

          {/* Funcionalidades */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg rounded-lg bg-white flex items-start">
              <FiUserPlus className="text-4xl text-cyan-500 mr-4" />
              <div>
                <CardTitle className="text-xl font-bold">
                  Crear Estudiante
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Agrega nuevos estudiantes a la plataforma para que puedan
                  inscribirse en los cursos.
                </CardDescription>
              </div>
            </Card>

            <Card className="p-6 shadow-lg rounded-lg bg-white flex items-start">
              <FiUsers className="text-4xl text-blue-500 mr-4" />
              <div>
                <CardTitle className="text-xl font-bold">
                  Ver Estudiantes
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Consulta la lista de estudiantes registrados y sus detalles.
                </CardDescription>
              </div>
            </Card>

            <Card className="p-6 shadow-lg rounded-lg bg-white flex items-start">
              <FiEdit className="text-4xl text-green-500 mr-4" />
              <div>
                <CardTitle className="text-xl font-bold">
                  Modificar Estudiante
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Edita la información de los estudiantes existentes en la
                  plataforma.
                </CardDescription>
              </div>
            </Card>

            <Card className="p-6 shadow-lg rounded-lg bg-white flex items-start">
              <FiUserMinus className="text-4xl text-red-500 mr-4" />
              <div>
                <CardTitle className="text-xl font-bold">
                  Eliminar Estudiante
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Elimina estudiantes que ya no formen parte de la plataforma.
                </CardDescription>
              </div>
            </Card>
          </div>
        </div>

        {/* Segunda subsección (lado derecho) */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Estudiantes</h2>
            <Button
              className="bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 text-sm rounded-lg"
              onClick={handleCreate}
            >
              Crear Estudiante
            </Button>
          </div>
          <Table className="w-full bg-white shadow-md rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estudiantes.map((estudiante) => (
                <TableRow key={estudiante.id}>
                  <TableCell>{estudiante.id}</TableCell>
                  <TableCell>{estudiante.nombre}</TableCell>
                  <TableCell>{estudiante.apellido}</TableCell>
                  <TableCell>{estudiante.email}</TableCell>
                  <TableCell>{estudiante.telefono}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      className="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1 rounded-md"
                      onClick={() => handleEdit(estudiante)}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      className="bg-red-500 text-white hover:bg-red-600 text-sm px-3 py-1 rounded-md"
                      onClick={() => handleDelete(estudiante.id!)}
                    >
                      <FiTrash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal FormEstudiante */}
      <FormEstudiante
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        estudiante={selectedEstudiante}
        onEstudianteUpdated={fetchEstudiantes}
      />
    </div>
  );
};

export default EstudiantesPage;
