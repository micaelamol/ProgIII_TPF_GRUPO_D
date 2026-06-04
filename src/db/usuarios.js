import { connection } from "./connection.js";

export class Usuarios {

    static async listarUsuarios() {
        try {
            const sql = "SELECT * FROM usuarios WHERE activo = 1";
            const [rows] = await connection.query(sql);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async listarUsuarioPorId(id) {
        try {
            const sql = "SELECT * FROM usuarios WHERE id_usuario = ? AND activo = 1";
            const [rows] = await connection.query(sql, [id]);

            if (rows.length === 0) {
                const error = new Error(`No se encontró el usuario con id ${id}`);
                error.status = 404;
                throw error;
            }

            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async crearUsuario(usuario) {
        try {
            const sql = `
                INSERT INTO usuarios
                (
                    documento,
                    apellido,
                    nombres,
                    email,
                    contrasenia,
                    foto_path,
                    rol,
                    activo
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [result] = await connection.query(sql, [
                usuario.documento,
                usuario.apellido,
                usuario.nombres,
                usuario.email,
                usuario.contrasenia,
                usuario.foto_path,
                usuario.rol,
                usuario.activo
            ]);

            return {
                id_usuario: result.insertId,
                ...usuario
            };
        } catch (error) {
            throw error;
        }
    }

    static async actualizarUsuario(id, usuario) {
        try {
            const sql = `
                UPDATE usuarios
                SET documento = ?,
                    apellido = ?,
                    nombres = ?,
                    email = ?,
                    contrasenia = ?,
                    foto_path = ?,
                    rol = ?,
                    activo = ?
                WHERE id_usuario = ?
            `;

            const [result] = await connection.query(sql, [
                usuario.documento,
                usuario.apellido,
                usuario.nombres,
                usuario.email,
                usuario.contrasenia,
                usuario.foto_path,
                usuario.rol,
                usuario.activo,
                id
            ]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontró el usuario con id ${id}`);
                error.status = 404;
                throw error;
            }

            return {
                id_usuario: id,
                ...usuario
            };
        } catch (error) {
            throw error;
        }
    }

    static async eliminarUsuario(id) {
        try {
            const sql = "UPDATE usuarios SET activo = 0 WHERE id_usuario = ?";

            const [result] = await connection.query(sql, [id]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontró el usuario con id ${id}`);
                error.status = 404;
                throw error;
            }

            return {
                status: 200,
                message: `Usuario con id ${id} eliminado exitosamente`
            };
        } catch (error) {
            throw error;
        }
    }
}