# API REST - Sistema de Gestión de Turnos Médicos

## Trabajo Final Integrador - Programación III 2026

### Tecnicatura Universitaria en Desarrollo Web - UNER

Proyecto desarrollado bajo la guía de los profesores **Cristian Faure** y **Nacho Novello**.

---

## 📋 Descripción

API REST para la gestión de turnos de una clínica médica. Permite administrar médicos, pacientes, especialidades, obras sociales y turnos, implementando autenticación JWT, autorización por roles, documentación Swagger y generación de reportes PDF.

---

## 👥 Equipo - Grupo D

- Carlos Gabrovich
- Enzo Sebastian Guido
- Vanesa Micaela Molina
- Camila Battagliotti
- Alethia Azul Gerez Medina
- Paola Peñalva Rebaquela

---

## 🚀 Instalación

```bash
git clone https://github.com/micaelamol/ProgIII_TPF_GRUPO_D.git
cd ProgIII_TPF_GRUPO_D
npm install
npm run dev
```

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=prog2026
DB_PASSWORD=prog2026
DB_NAME=prog3_turnos

PORT=3000
SECRET_KEY=tu_clave_secreta

REDIS_HOST=tu_url_redis
```

---

## 📖 Documentación

**Swagger** disponible en:

```txt
http://localhost:3000/docs
```

---

## 👤 Usuarios de prueba

| Rol               | Email                                         | Contraseña  |
| ----------------- | --------------------------------------------- | ----------- |
| Administrador (3) | [admin@test.com](mailto:admin@test.com)       | admin123    |
| Médico (1)        | [medico@test.com](mailto:medico@test.com)     | medico123   |
| Paciente (2)      | [paciente@test.com](mailto:paciente@test.com) | paciente123 |

---

## 🔐 Autenticación

```http
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/password/forgot
POST /api/v1/password/reset
```

---

## 📌 Funcionalidades por rol

### Médico (Rol 1)

- Iniciar sesión.
- Listar turnos propios.
- Marcar turnos como atendidos.

### Paciente (Rol 2)

- Iniciar sesión.
- Reservar turnos.
- Listar turnos propios.
- Listar especialidades.
- Listar médicos.

### Administrador (Rol 3)

- Gestionar especialidades.
- Gestionar médicos.
- Gestionar pacientes.
- Gestionar obras sociales.
- Registrar turnos.
- Obtener estadísticas.
- Generar informes PDF.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MySQL
- JWT
- Passport
- Redis
- Swagger
- Morgan
- Express Validator
- Multer
- Handlebars
- Puppeteer
- HTML, CSS y JavaScript
- CORS

---

## ✨ Funcionalidad extra

### Reinicio de contraseña

Implementación de recuperación y restablecimiento de contraseña mediante tokens temporales almacenados en Redis.

Endpoints:

```http
POST /api/v1/password/forgot
POST /api/v1/password/reset
```

---

## 📁 Estructura del proyecto

```txt
src/
├── config/
├── controllers/
├── db/
├── middlewares/
├── publico/
├── routers/
├── services/
├── utiles/
├── servidor.js
└── turnos.js
```

---

## 📄 Generación de informes PDF

Se implementó la generación de reportes PDF con estadísticas de turnos agrupadas por especialidad.

### Tecnologías utilizadas

- Stored Procedures (MySQL)
- Handlebars
- Puppeteer
- Swagger

### Flujo de funcionamiento

1. Se ejecuta un procedimiento almacenado.
2. Se obtienen estadísticas de turnos por especialidad.
3. Los datos se envían a una plantilla Handlebars.
4. Puppeteer genera el PDF.

### Endpoint

```http
GET /api/v1/turnos-reservas/por-especialidad
```

### Permisos

- Administrador (Rol 3)

---

## 👤 Actualización de perfil

Se desarrolló un formulario web para la actualización de datos del usuario.

### Funcionalidades

- Modificación de nombre.
- Modificación de apellido.
- Modificación de documento.
- Carga de foto de perfil.
- Vista previa de imagen.

### Carga de imágenes

Se utiliza Multer para almacenar imágenes en:

```txt
src/publico/
```

En la base de datos se almacena únicamente:

```txt
foto_path
```

Ejemplo:

```txt
1781487407188-imagen.jpg
```

### Acceso al formulario

```txt
http://localhost:3000/perfil.html
```

---

## 🗄️ Cambios en la base de datos

Se agregó la columna `activo` a la tabla `medicos` para implementar bajas lógicas (soft delete), evitando la eliminación física de registros.

---

## 🔄 Transacciones MySQL

Se implementaron transacciones para garantizar la integridad de los datos durante operaciones críticas.

Métodos utilizados:

- beginTransaction()
- commit()
- rollback()

---

## ✅ Requisitos implementados

- Autenticación JWT.
- Autorización por roles.
- Persistencia en MySQL.
- Stored Procedures.
- Generación de PDF.
- Swagger.
- Redis.
- Multer.
- Morgan.
- Express Validator.
- CORS.
- Soft Delete.
- Transacciones MySQL.
