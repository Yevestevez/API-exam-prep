# API DATE test preparation

Práctica de creación de una API con node/express/prisma y arquitectura MVC y repo/controller/router.

## Requisitos

Debo preparar una API `para hacer peticiones CRUD a una base de datos SQL` con `prisma` y `express` con la siguiente estructura.

La entidad a gestionar es Wizard, con los siguientes campos:

- id (string, primary key)
- name (string)
- surname (string)
- password (string)
- age (number)
- house (string)
- wand (string)
- patronus (string)
- createdAt (DateTime)
- updatedAt (DateTime)

La API constará de los siguientes endpoints:

- `GET /wizards`: Devuelve una lista de todos los magos matriculados.
- `GET /wizards/:id`: Devuelve un mago específico por su ID.
- `POST /wizards`: Matricula un nuevo mago en la escuela.
- `PUT /wizards/:id`: Actualiza la información de un mago ya matriculado.
- `DELETE /wizards/:id`: Expulsa un mago de la escuela.

Usaremos una base de datos SQL Postgres alojada en un contenedor Docker.

Usaremos un debugger, por ejemplo DEBUG para node, para depurar la aplicación. Además, si da aplicaremos una gestión de errores centralizada para manejar los errores de manera uniforme en toda la API.

Usaremos Postman para probar los endpoints de la API y asegurarnos de que funcionan correctamente.

Si da tiempo, implementaremos autenticación y autorización para proteger los endpoints de la API, por ejemplo usando JWT (JSON Web Tokens) para asegurar que solo los usuarios autorizados puedan acceder a ciertos recursos. Además, implementaremos validación de datos para asegurarnos de que los datos enviados a la API sean correctos y cumplan con los requisitos establecidos. Por ejemplo, Zod.

Si da tiempo haremos test del controlador y repositorio usando simplemente node con assert.

## Orden de implementación, según tiempo:

1. Configuración del proyecto y conexión a la base de datos.
2. Creación del modelo de datos y migraciones.
3. Implementación de los controladores y rutas.
4. Pruebas de los endpoints.
5. Implementación de autenticación y autorización.
6. Validación de datos.
7. Test del controlador y repositorio.
