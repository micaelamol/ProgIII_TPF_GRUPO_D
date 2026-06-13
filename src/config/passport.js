import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local"; 

import UsuariosServicio from "../services/usuariosServicio.js";


// Estrategia LOCAL login con email y contraseña
const estrategia = new LocalStrategy(
  {
    usernameField: "email",       // campo del body que representa el usuario
    passwordField: "contrasenia", // campo del body que representa la contraseña
  },
  async (email, contrasenia, done) => {
    try {
      const usuariosServicio = new UsuariosServicio();
      const usuario = await usuariosServicio.buscar(email, contrasenia);

      if (!usuario) {
        return done(null, false, { estado: false, mensaje: "Login incorrecto!" });
      }

      return done(null, usuario, { estado: true, mensaje: "Login correcto!" });
    } catch (exc) {
      done(exc);
    }
  }
);

// JWT  validación de token en los headers
const validacion = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.SECRET_KEY,                      // clave secreta definida en tu .env
  },
  async (jwtPayload, done) => {
    try {
      const usuariosServicio = new UsuariosServicio();
      const usuario = await usuariosServicio.buscarPorId(jwtPayload.id_usuario);

      if (!usuario) {
        return done(null, false, { mensaje: "Token incorrecto!" });
      }

      return done(null, usuario);
    } catch (exc) {
      done(exc);
    }
  }
);

export { estrategia, validacion };
