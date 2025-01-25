import axios from 'axios';

const BASE_URL = 'http://localhost:8003/api/estudiantes';

export interface Estudiante {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    telefono: string;
}

export const getEstudiantes = async (): Promise<Estudiante[]> => {
  const response = await axios.get<Estudiante[]>(BASE_URL);
  return response.data;
};

export const getEstudianteById = async (id: number): Promise<Estudiante> => {
  const response = await axios.get<Estudiante>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createEstudiante = async (estudiante: Estudiante): Promise<Estudiante> => {
  const response = await axios.post<Estudiante>(BASE_URL, estudiante);
  return response.data;
};

export const updateEstudiante = async (id: number, estudiante: Estudiante): Promise<Estudiante> => {
  const response = await axios.put<Estudiante>(`${BASE_URL}/${id}`, estudiante);
  return response.data;
};

export const deleteEstudiante = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
