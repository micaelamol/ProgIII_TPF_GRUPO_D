import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import loginRouter from "./routers/v1/loginRutas.js";
import especialidadesRouter from "./routers/v1/especialidadesRutas.js";
import obrasSocialesRouter from "./routers/v1/obrasSocialesRutas.js"; 
import turnosReservasRouter from "./routers/v1/turnosReservasRutas.js";
import medicosRouter from "./routers/v1/medicosRutas.js"; 
import pacientesRouter from "./routers/v1/pacientesRutas.js";
import usuariosRouter from "./routers/v1/usuariosRutas.js"
import { autentication } from "./middlewares/autentication.js";
import changePasswordRouter from "./routers/v1/changePasswordRutas.js";
dotenv.config();

const app = express();

let log = fs.createWriteStream('./accesos.log', { 
    flags: 'a'
});


app.use(cors());
app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));

app.use(express.json());

//autenticacion con JWT
//middleware para verificar el token JWT en cada solicitud, extraer los datos del usuario autenticado y almacenarlos en req.session para su uso en las rutas protegidas
app.use(cookieParser());
app.use(autentication);



// Config rutas
app.use("/api/v1/auth/", loginRouter);
app.use("/api/v1/especialidades", especialidadesRouter);
app.use("/api/v1/obras_sociales", obrasSocialesRouter); 
app.use("/api/v1/turnos-reservas", turnosReservasRouter);
app.use("/api/v1/medicos", medicosRouter);
app.use("/api/v1/pacientes", pacientesRouter);
app.use("/api/v1/usuarios",usuariosRouter);
app.use("/api/v1/password", changePasswordRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ estado: "OK", msg: "Servidor funcionando" });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  //console.error(err.stack);
  if(err.message.includes("Expected double-quoted")){
    return res.status(400).json({ estado: false, msg: "Error de formato del json en la solicitud" });
  }
  res.status(500).json({ estado: false, msg: "Error interno del servidor" });
});

export default app;

// Opciones de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Turnos Médicos",
      version: "1.0.0",
      description: "Documentación de la API de turnos médicos"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/routers/v1/*.js"] // ajustá la ruta según donde tengas tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Montar Swagger en /docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));