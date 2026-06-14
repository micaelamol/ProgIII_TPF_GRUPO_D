import jwt from "jsonwebtoken";
import { Usuarios } from "../db/usuarios.js";
import { createClient } from "redis";


export async function autentication(req, res, next) {
  req.user = { id_usuario: "", usuario: "", rol: "" };
  try {
    const token = req.headers['authorization']?.split(' ')[1] 
    
    if (token) {
      
      const datos = jwt.verify(token, process.env.SECRET_KEY);
      

      const client = await createClient({url: 'redis://default:RO4vsO0cjg4jHlpFaNbKGaO0T5qUANev@tendency-island-grade-36016.db.redis.io:13527'});
      await client.connect();
      const estaAnulado = await client.exists(`revoked_${token}`) === 1;
      
      await client.quit();

      if (estaAnulado) {
        return res.status(401).send("Token inválido: el token ha sido anulado");
      }
      const usuario = async () => await Usuarios.obtenerUsuarioPorId(datos.id_usuario);
      if (usuario) {
        req.user = { id_usuario: datos.id_usuario, usuario: datos.usuario, rol: datos.rol };
      }

    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Token inválido");
    };
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token expirado");
    }

    return res.status(500).send("Error en la verificacion del token", error.message);
  }
  next();
};