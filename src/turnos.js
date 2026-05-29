import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";

import especialidadesRouter from "./routers/v1/especialidadesRouter.js";
import obrasSocialesRouter from "./routers/v1/obrasSocialesRouter.js"; 


dotenv.config();

const app = express();

let log = fs.createWriteStream('./accesos.log', { 
    flags: 'a'
});

app.use(morgan('dev'));
app.use(morgan('combined', {stream: log}));


app.use(express.json());

// Rutas
app.use("/api/v1/especialidades", especialidadesRouter);
app.use("/api/v1/obras_sociales", obrasSocialesRouter); 

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ estado: "OK", msg: "Servidor funcionando" });
});

// Middleware para manejo de errores
app.use((err,req, res,next) => {
  //console.error(err.stack);
  if(err.message.includes("Expected double-quoted")){
    return res.status(400).json({ estado: false, msg: "Error de formato del json en la solicitud" });
  }
  res.status(500).json({ estado: false, msg: "Error interno del servidor" });
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});