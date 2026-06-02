import express from "express";
import dotenv from "dotenv";
import especialidadesRouter from "./routers/v1/especialidadesRouter.js";
import obrasSocialesRouter from "./routers/v1/obrasSocialesRouter.js";
import medicosRouter from "./routers/v1/medicosRouter.js"; 

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use("/api/v1/especialidades", especialidadesRouter);
app.use("/api/v1/obras_sociales", obrasSocialesRouter);
app.use("/api/v1/medicos", medicosRouter);

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