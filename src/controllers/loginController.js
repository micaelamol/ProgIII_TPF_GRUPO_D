import { Usuarios } from "../db/usuarios.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export class LoginController {
  static async login(req,res) {
    try{
    const { email, contrasenia } = req.body;
    // consulta a la base de datos la lista de usuarios
    const usuarios = await Usuarios.listarUsuarios();

    //busca si coincide el email del usuario ingresado con alguno de la base de datos
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email === email
    );
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
      res.status(401).json({ estado: false, message: "Credenciales inválidas" });
    } else {
      
      
    
      // Genera un token JWT con el email del usuario como payload y una clave secreta, con una expiración de 1 hora
      const payload = { id_usuario: usuarioEncontrado.id_usuario, usuario: usuarioEncontrado.nombres+' '+usuarioEncontrado.apellido, rol: usuarioEncontrado.rol };
      console.log("Payload del token JWT: ", payload);
      const token = jwt.sign(
        { payload },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      // Elimina la contraseña del objeto de usuario antes de enviarlo en la respuesta
      usuarioEncontrado.contrasenia = "";
      // Envía el token JWT en una cookie segura y devuelve un JSON con el resultado exitoso y los datos del usuario
      res
        .cookie("acces-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000,
        })
        .status(200)
        .json({ estado: true, message: "Inicio de sesion exitoso" });;
      }
    }catch (error) {
    console.error("Error en el login: ", error);
    res.status(500).send(error.message);
  }
    
  }
}

