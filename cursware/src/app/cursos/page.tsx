"use client";

import { useEffect, useState } from "react";
import { FiBookOpen, FiPlusCircle, FiEdit, FiUsers, FiTrash } from "react-icons/fi";
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
import { getCursos, Curso, deleteCurso } from "@/services/cursosService";
import { format } from "date-fns";
import CrearCurso from "../ui/CrearCurso";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const CursosPage = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [showCrearCurso, setShowCrearCurso] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);

  const fetchCursos = async () => {
    const data = await getCursos();
    setCursos(data);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCurso(id);
      toast({
        title: "Éxito",
        description: "El curso se eliminó correctamente.",
        variant: "default",
      });
      fetchCursos(); // Refresh the courses list after deletion
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Hubo un error al eliminar el curso.";
      toast({
        title: "Error",
        description: "Un curso con estudiantes matriculados no puede ser eliminado.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (curso: Curso) => {
    setSelectedCurso(curso);
    setShowCrearCurso(true);
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Encabezado principal */}
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FiBookOpen className="text-cyan-500" /> Gestión Cursos
        </h1>
      </header>

      {/* Sección general */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primera subsección (lado izquierdo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
          {/* Encabezado */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Bienvenido a la administración de cursos
            </h2>
            <p className="text-lg text-gray-600">
              Aquí puedes gestionar los cursos disponibles y administrar la
              matrícula de estudiantes.
            </p>
          </div>

          {/* Funcionalidades */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg rounded-lg bg-white flex items-start">
              <FiBookOpen className="text-4xl text-blue-500 mr-4" />
              <div>
                <CardTitle className="text-xl font-bold">
                  Ver Cursos Existentes
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Consulta la lista de cursos disponibles y sus detalles.
                </CardDescription>
              </div>
            </Card>

            <Card className="p-6 shadow-lg rounded-lg bg-white flex items-start">
              <FiEdit className="text-4xl text-green-500 mr-4" />
              <div>
                <CardTitle className="text-xl font-bold">
                  Modificar Cursos
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Edita la información de los cursos ya creados en la
                  plataforma.
                </CardDescription>
              </div>
            </Card>

            <Card className="p-6 shadow-lg rounded-lg bg-white flex items-start">
              <FiPlusCircle className="text-4xl text-cyan-500 mr-4" />
              <div>
                <CardTitle className="text-xl font-bold">
                  Crear Nuevos Cursos
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Agrega nuevos cursos a la plataforma para que los estudiantes
                  puedan inscribirse.
                </CardDescription>
              </div>
            </Card>

            <Card className="p-6 shadow-lg rounded-lg bg-white flex items-start">
              <FiUsers className="text-4xl text-purple-500 mr-4" />
              <div>
                <CardTitle className="text-xl font-bold">
                  Matricular Estudiantes
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Gestiona la inscripción de estudiantes en los cursos
                  disponibles.
                </CardDescription>
              </div>
            </Card>
          </div>
        </div>

        {/* Segunda subsección (lado derecho) */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Cursos</h2>
            <Button
              className="bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 text-sm rounded-lg"
              onClick={() => {
                setSelectedCurso(null);
                setShowCrearCurso(true);
              }}
            >
              Crear Curso
            </Button>
          </div>
          <Table className="w-full bg-white shadow-md rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>Creado En</TableHead>
                <TableHead>Número de Estudiantes</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cursos.map((curso) => (
                <TableRow key={curso.id}>
                  <TableCell>{curso.id}</TableCell>
                  <TableCell>{curso.nombre}</TableCell>
                  <TableCell>{curso.descripcion}</TableCell>
                  <TableCell>{curso.creditos}</TableCell>
                  <TableCell>
                    {format(new Date(curso.creadoEn || ""), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{curso.cursoUsuarios?.length || 0}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      className="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1 rounded-md"
                      onClick={() => handleEdit(curso)}
                    >
                      <FiEdit />
                    </Button>
                    <Button
                      className="bg-red-500 text-white hover:bg-red-600 text-sm px-3 py-1 rounded-md"
                      onClick={() => handleDelete(curso.id!)}
                    >
                      <FiTrash />
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Link href={`/cursos/${curso.id}`} passHref>
                      <Button className="bg-green-200 text-gray-800 hover:bg-gray-300 text-sm px-3 py-1 rounded-md">
                        Matricula
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal CrearCurso */}
      <CrearCurso
        isOpen={showCrearCurso}
        onClose={() => setShowCrearCurso(false)}
        onCursoCreated={fetchCursos}
        curso={selectedCurso}
      />
    </div>
  );
};

export default CursosPage;
