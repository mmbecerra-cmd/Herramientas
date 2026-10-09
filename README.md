# Backend para Gestión de Usuarios

Proyecto de desarrollo backend utilizando NestJS y TypeScript. La aplicación implementa la gestión completa de usuarios en memoria e integra métodos HTTP avanzados para metadatos e inspección de rutas.

## 📌 Contenido del Proyecto

- **Persistencia Volátil:** Uso del archivo `temporal.ts` para manejar el arreglo de usuarios en memoria RAM sin necesidad de bases de datos externas.
- **Rutas y Operaciones:**
  - `GET /usuarios`: Obtener la lista completa de usuarios.
  - `GET /usuarios/:id`: Consultar un usuario específico por su ID.
  - `POST /usuarios`: Registrar un nuevo usuario.
  - `PUT /usuarios/:id`: Reemplazar totalmente los datos de un usuario.
  - `PATCH /usuarios/:id`: Actualizar parcialmente campos de un usuario.
  - `DELETE /usuarios/:id`: Eliminar un registro.
- **Cabeceras e Introspección:**
  - `HEAD /usuarios`: Retorna métricas del servicio (`X-Total-Usuarios`) con cuerpo vacío.
  - `OPTIONS /usuarios`: Devuelve los métodos de acceso autorizados (`Allow`).

## ⚙️ Instrucciones de Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install