import axios from 'axios';

const BASE_URL = 'http://localhost:8002/api/cursos';

export interface Curso {
    id?: number;
    nombre: string;
    descripcion: string;
    creditos: number;
    creadoEn?: string;
    cursoUsuarios?: Array<{ id: number; usuarioId: number }>;
}


export const getCursos = async (): Promise<Curso[]> => {
    const response = await axios.get<Curso[]>(BASE_URL);
    return response.data;
};

export const getCursoById = async (id: number): Promise<Curso> => {
    const response = await axios.get<Curso>(`${BASE_URL}/${id}`);
    return response.data;
};

export const createCurso = async (curso: Curso): Promise<Curso> => {
    const response = await axios.post<Curso>(BASE_URL, curso);
    return response.data;
};

export const updateCurso = async (id: number, curso: Curso): Promise<Curso> => {
    const response = await axios.put<Curso>(`${BASE_URL}/${id}`, curso);
    return response.data;
  };
  


export const assignStudentToCurso = async (cursoId: number, studentId: number): Promise<void> => {
    await axios.post(`${BASE_URL}/${cursoId}`, { id: studentId });
};

export const removeStudentFromCurso = async (cursoId: number, studentId: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${cursoId}/usuario/${studentId}`);
};

export const deleteCurso = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};
