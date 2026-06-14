import { Usuarios } from "../db/usuarios.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import {createClient} from "redis";
//import dotenv from "dotenv";
//dotenv.config();

export class LoginController {
  static async login(req, res) {
    try {
      const { email, contrasenia } = req.body;
      // consulta a la base de datos la lista de usuarios
      const usuarios = await Usuarios.listarUsuarios();

      //busca si coincide el email del usuario ingresado con alguno de la base de datos
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email,
      );

      if (!usuarioEncontrado) {
        return res
          .status(401)
          .json({ estado: false, message: "Credenciales inválidas" });
      }

      // Encripta la contraseña ingresada para compararla con la almacenada en la base de datos
      const contraseniaCrypt = crypto
        .createHash("sha256")
        .update(contrasenia)
        .digest("hex");
      //compara la contraseña encriptada con la almacenada en la base de datos
      const esValido = crypto.timingSafeEqual(
        Buffer.from(contraseniaCrypt),
        Buffer.from(usuarioEncontrado.contrasenia),
      );

      //lanza un error si no se encuentra el usuario o si la contraseña no coincide, de lo contrario devuelve un objeto con el resultado exitoso y los datos del usuario (sin la contraseña)
      if (!usuarioEncontrado || !esValido) {
        res
          .status(401)
          .json({ estado: false, message: "Credenciales inválidas" });
      } else {
        // Genera un token JWT con el email del usuario como payload y una clave secreta, con una expiración de 1 hora
        const payload = {
          id_usuario: usuarioEncontrado.id_usuario,
          usuario: usuarioEncontrado.nombres + " " + usuarioEncontrado.apellido,
          rol: usuarioEncontrado.rol,
        };
        console.log("Payload del token JWT: ", payload);
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        // Envía el token JWT en un JSON con el resultado exitoso
        res.status(200).json({ estado: true, token: token });
      }
    } catch (error) {
      console.error("Error en el login: ", error);
      res.status(500).send(error.message);
    }
  }

  static async logout(req, res) {
    try {
    ///res.clearCookie("acces-token").status(200).json({ success: true, message: "Logout exitoso" });
    console.log("Iniciando proceso de logout...");
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      const usuario = async () => await Usuarios.obtenerUsuarioPorId(datos.id_usuario);
      if (!usuario) {
        res.status(401).json({ success: false, message: "Usuario no encontrado" });
        return;
      }
      // Agrega el token a la lista de tokens revocados en Redis con una expiración igual al tiempo restante del token
      const client = await createClient({url: 'redis://default:RO4vsO0cjg4jHlpFaNbKGaO0T5qUANev@tendency-island-grade-36016.db.redis.io:13527'});
      await client.connect();
      const decoded = jwt.decode(token,process.env.SECRET_KEY);
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      await client.setEx(`revoked_${token}`, expiresIn, "anulado");
      await client.quit();
      return res.status(200).json({ success: true, message: "Logout exitoso" });
    }else {
      return res.status(400).json({ success: false, message: "No se proporcionó un token válido" });
    }
  
    } catch (error) {
      console.error("Error en el logout: ", error);
      res.status(500).send(error.message);


  }
}
}
