import { Usuarios } from "../db/usuarios.js";
import crypto from "crypto";

export default class UsuariosServicio {

    static async obtenerUsuarios() {
        const usuarios = await Usuarios.listarUsuarios();
        return usuarios;
    }

    static async obtenerUsuarioPorId(id) {
        const usuario = await Usuarios.listarUsuarioPorId(id);
        return usuario;
    }

    static async crearUsuario(body) {

        const nuevoUsuario = {
            documento: body.documento,
            apellido: body.apellido,
            nombres: body.nombres,
            email: body.email,
            contrasenia: crypto.createHash("sha256").update(body.contrasenia).digest("hex"),
            foto_path: body.foto_path || null,
            rol: Number(body.rol),
            //activo: body.activo ? 1 : 0
            activo: Number(body.activo),
        };

        const resultado = await Usuarios.crearUsuario(nuevoUsuario);
        return resultado;
    }

    static async actualizarUsuario(id, body) {

        const usuarioActualizado = {
            documento: body.documento,
            apellido: body.apellido,
            nombres: body.nombres,
            email: body.email,
            contrasenia: body.contrasenia,
            foto_path: body.foto_path || null,
            rol: Number(body.rol),
            activo: Number(body.activo),
            //rol: body.rol !== undefined ? Number(body.rol) : undefined,
          // activo: body.activo !== undefined ? Number(body.activo) : undefined
        };

        const resultado = await Usuarios.actualizarUsuario(
            id,
            usuarioActualizado
        );

        return resultado;
    }

    static async eliminarUsuario(id) {
        const resultado = await Usuarios.eliminarUsuario(id);
        return resultado;
    }
}