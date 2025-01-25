# Usa una imagen base de OpenJDK con Java 17
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR generado al contenedor
COPY target/estudiantes-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto en el que corre la app (8002 en este caso)
EXPOSE 8003

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
