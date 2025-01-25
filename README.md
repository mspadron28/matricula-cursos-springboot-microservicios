# Matricula Cursos Microservicios usando Spring Boot + Dockerización

Este proyecto consiste en un sistema de matriculación de estudiantes en cursos, desarrollado bajo una arquitectura de microservicios utilizando Spring Boot para el backend y Next.js para el frontend. Además, se encuentra completamente dockerizado para facilitar su despliegue y ejecución.

## Estructura del Proyecto
El repositorio contiene tres carpetas principales:

1. **ms-cursos**: Proyecto que gestiona el microservicio de cursos.
2. **estudiantes**: Proyecto que gestiona el microservicio de estudiantes.
3. **cursware**: Proyecto que contiene el frontend y sirve como la aplicación para la matriculación de estudiantes en cursos.

Cada uno de estos proyectos está configurado para funcionar con Docker.

## Pasos para Configurar y Ejecutar el Proyecto
Siga los siguientes pasos para levantar el proyecto:

### 1. Crear las Imágenes Docker de los Microservicios y Frontend

1. **Microservicio de Cursos:**
   - Abra una terminal y ubíquese en la carpeta `ms-cursos`.
   - Ejecute el siguiente comando para construir la imagen Docker:
     ```bash
     docker build -t curso-user-app-image .
     ```

2. **Microservicio de Estudiantes:**
   - Abra una terminal y ubíquese en la carpeta `estudiantes`.
   - Ejecute el siguiente comando para construir la imagen Docker:
     ```bash
     docker build -t estudiantes-app-image .
     ```

3. **Frontend (CursWare):**
   - Abra una terminal y ubíquese en la carpeta `cursware`.
   - Ejecute el siguiente comando para construir la imagen Docker:
     ```bash
     docker build -t frontend-cursware .
     ```

### 2. Ejecutar el Proyecto con Docker Compose

1. Una vez creadas todas las imágenes, ubíquese en la carpeta raíz del proyecto (donde se encuentra el archivo `docker-compose.yml`).
2. Ejecute el siguiente comando para levantar los servicios:
   ```bash
   docker-compose up -d
   ```

### 3. Acceder al Aplicativo

1. Abra Docker Desktop o cualquier interfaz que esté utilizando para administrar contenedores Docker.
2. Localice el contenedor llamado `frontend-cursware`.
3. Haga clic en el puerto expuesto para abrir la aplicación en el navegador.

## Tecnologías Utilizadas

- **Backend:** Spring Boot (Java)
- **Frontend:** Next.js (React)
- **Bases de Datos:** MySQL para el microservicio de cursos y PostgreSQL para el microservicio de estudiantes
- **Contenedores:** Docker y Docker Compose

## Notas Adicionales

- Asegúrese de tener Docker y Docker Compose instalados en su sistema antes de comenzar.
- Si desea reiniciar algún servicio, puede usar el comando:
  ```bash
  docker-compose restart <nombre_del_servicio>
  ```
- Para detener y eliminar los contenedores, use:
  ```bash
  docker-compose down
  ```

Con estos pasos, tendrá el sistema completamente operativo y listo para gestionar la matriculación de estudiantes en cursos. ¡Disfrute trabajando con este proyecto! 🚀

