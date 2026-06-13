import jwt from "jsonwebtoken";
import crypto from "crypto";
import { createClient } from "redis";
import UsuariosServicio from "../services/usuariosServicio.js";
import { Usuarios } from "../db/usuarios.js";
import dotenv from "dotenv";
dotenv.config();

export class changePasswordController {
  constructor() {
    //console.log("ChangePasswordController initialized");
  }
//funcion para solicitar el cambio de contraseña, recibe un email, verifica si existe en la base de datos, genera un token JWT con el id_usuario y el email como payload, lo guarda en Redis con una expiración de 15 minutos y devuelve el token en la respuesta
  async forgotPassword(req, res) {
    try {
      console.log("Forgot password endpoint hit");

      const usuarios = await Usuarios.listarUsuarios();
      //console.log("Usuarios:", usuarios);
      const { email } = req.body;
      const emailEncontrado = usuarios.find(
        (usuario) => usuario.email === email,
      );
      if (!emailEncontrado) {
        return res
          .status(404)
          .json({ status: false, message: "Email no encontrado." });
      }
      const payload = {
        id_usuario: emailEncontrado.id_usuario,
        email: emailEncontrado.email,
        fecha: new Date(),
      };
      const tokenReset = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "0.25h",
      });
      const client = createClient({
        url: "redis://default:RO4vsO0cjg4jHlpFaNbKGaO0T5qUANev@tendency-island-grade-36016.db.redis.io:13527",
      });
      await client.connect();
      await client.set(
        `reset_token:${emailEncontrado.id_usuario}`,
        tokenReset,
        { EX: 900 },
      );
      await client.quit();

      return res.status(201).json({ estado: true, resetToken: tokenReset });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res
        .status(500)
        .json({ message: "Error processing forgot password request." });
    }
  }

  async resetPassword(req, res) {
    try {
      //console.log("ruta para Reset password");
      const { token, newPassword } = req.body;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      //console.log("Decoded token:", decoded);

      const client = createClient({
        url: "redis://default:RO4vsO0cjg4jHlpFaNbKGaO0T5qUANev@tendency-island-grade-36016.db.redis.io:13527",
      });
      await client.connect();
      const storedToken = await client.get(`reset_token:${decoded.id_usuario}`);
      
      if (storedToken !== token) {
        return res
          .status(400)
          .json({ status: false, message: "Token inválido o expirado." });
      }
      // lógica para actualizar la contraseña del usuario en la base de datos
      const usuario = await UsuariosServicio.obtenerUsuarioPorId(
        decoded.id_usuario,
      );
      if (!usuario) {
        return res
          .status(404)
          .json({ status: false, message: "Usuario no encontrado." });
      }
      // se guarda en el usuario la contraseña encriptada 
      usuario.contrasenia = crypto
        .createHash("sha256")
        .update(newPassword)
        .digest("hex");
      delete usuario.id_usuario;

      await UsuariosServicio.actualizarUsuario(decoded.id_usuario, usuario);
      // elimino el token de redis despues de utilizarla
      await client.del(`reset_token:${decoded.id_usuario}`);
      await client.quit();
      return res
        .status(201)
        .json({ status: true, message: "Contraseña restablecida con éxito." });
    } catch (error) {
      //console.error("Error in resetPassword:", error);
      res
        .status(500)
        .json({ message: "Error procesando el reset de la contraseña." });
    }
  }
}
