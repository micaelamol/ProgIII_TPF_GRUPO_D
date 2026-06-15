import { Usuarios } from "../db/usuarios.js";
import crypto from "crypto";

export default class UsuariosServicio {

    static async obtenerUsuarios() {
        return await Usuarios.listarUsuarios();
    }

    static async obtenerUsuarioPorId(id) {
        return await Usuarios.listarUsuarioPorId(id);
    }

    static async crearUsuario(body) {

        const nuevoUsuario = {
            documento: body.documento,
            apellido: body.apellido,
            nombres: body.nombres,
            email: body.email,
            contrasenia: crypto
                .createHash("sha256")
                .update(body.contrasenia)
                .digest("hex"),
            foto_path: body.foto_path || null,
            rol: Number(body.rol),
            activo: Number(body.activo)
        };

        return await Usuarios.crearUsuario(nuevoUsuario);
    }

   static async actualizarUsuario(id, body) {

    const usuarioExistente =
        await Usuarios.listarUsuarioPorId(id);

    const usuarioActualizado = {
        documento: body.documento,
        apellido: body.apellido,
        nombres: body.nombres,

        email: usuarioExistente.email,
        contrasenia: usuarioExistente.contrasenia,
        rol: usuarioExistente.rol,
        activo: usuarioExistente.activo,

        foto_path:
            body.foto_path ||
            usuarioExistente.foto_path
    };

    return await Usuarios.actualizarUsuario(
        id,
        usuarioActualizado
    );

}

    static async eliminarUsuario(id) {
        return await Usuarios.eliminarUsuario(id);
    }
}