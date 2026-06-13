# API REST - Sistema de Gestión de Turnos Médicos

## Trabajo Final Integrador - Programación III 2026

### Tecnicatura Universitaria en Desarrollo Web - UNER

Proyecto desarrollado bajo la guía de los profesores **Cristian Faure** y **Nacho Novello**.

---

## Bienvenidos!!

![gif](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY29veXk3aTFvNHQ2bGQ3YXUzYmhwYmttdXh2cXI0bHI4eWZsMHdqNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgG50Fb7Mi0prBC/giphy.gif)

## 📋 Descripción

Esta es una API REST para la gestión de turnos de una clínica médica. Permite administrar especialidades, médicos, pacientes, obras sociales y turnos, con autenticación JWT y autorización por roles.

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

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña
DB_NAME=prog3_turnos
PORT=3000
SECRET_KEY=una_clave_secreta_larga
```

## 📖 Documentación

Swagger disponible en: `http://localhost:3000/docs`

---

## 👤 Usuarios de prueba

| Rol               | Email             | Contraseña  |
| ----------------- | ----------------- | ----------- |
| Administrador (3) | admin@test.com    | admin123    |
| Médico (1)        | medico@test.com   | medico123   |
| Paciente (2)      | paciente@test.com | paciente123 |

---

## 🔐 Autenticación

POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/forgot (reset de contraseña)
POST /api/v1/auth/reset

---

## 🛠️ Tecnologías utilizadas

- **Node.js** con **Express**
- **MySQL** con **mysql2**
- **JWT** para autenticación
- **express-validator** para validaciones
- **Morgan** para logging de requests
- **Swagger** para documentación
- **Puppeteer + Handlebars** para generación de PDF
- **Redis** para reset de contraseña
- **CORS** habilitado

---

## ✨ Funcionalidades extra

- Reinicio de contraseña con token temporal (Redis)

---

## 📁 Estructura del proyecto

```
src/
├── controllers/
├── db/
├── middlewares/
├── routers/v1/
├── services/
├── utiles/handlebars/
├── servidor.js
└── turnos.js
```
