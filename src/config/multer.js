import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/publico"); // carpeta donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); // nombre único para evitar sobrescribir
  },
});

// Middleware para subir un solo archivo
const upload = multer({ storage }).single("foto_perfil"); 
// "foto_perfil" debe coincidir con el name del input en tu formulario

export default upload; 