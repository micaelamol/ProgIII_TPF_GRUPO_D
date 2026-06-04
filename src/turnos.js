import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";

import especialidadesRouter from "./routers/v1/especialidadesRutas.js";
import obrasSocialesRouter from "./routers/v1/obrasSocialesRutas.js"; 
import turnosReservasRouter from "./routers/v1/turnosReservasRutas.js";
import medicosRouter from "./routers/v1/medicosRouter.js"; 
import pacientesRouter from "./routers/v1/pacientesRutas.js";
import usuariosRouter from "./routers/v1/usuariosRutas.js"

dotenv.config();

const app = express();

let log = fs.createWriteStream('./accesos.log', { 
    flags: 'a'
});

app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));

app.use(express.json());

// Config rutas
app.use("/api/v1/especialidades", especialidadesRouter);
app.use("/api/v1/obras_sociales", obrasSocialesRouter); 
app.use("/api/v1/turnos-reservas", turnosReservasRouter);
app.use("/api/v1/medicos", medicosRouter);
app.use("/api/v1/pacientes", pacientesRouter);
app.use("/api/v1/usuarios",usuariosRouter);

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