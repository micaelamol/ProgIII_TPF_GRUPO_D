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

        const campos = [];
        const valores = [];

        if (usuario.documento !== undefined) {
            campos.push("documento = ?");
            valores.push(usuario.documento);
        }

        if (usuario.apellido !== undefined) {
            campos.push("apellido = ?");
            valores.push(usuario.apellido);
        }

        if (usuario.nombres !== undefined) {
            campos.push("nombres = ?");
            valores.push(usuario.nombres);
        }

        if (usuario.email !== undefined) {
            campos.push("email = ?");
            valores.push(usuario.email);
        }

        if (usuario.contrasenia !== undefined) {
            campos.push("contrasenia = ?");
            valores.push(usuario.contrasenia);
        }

        if (usuario.foto_path !== undefined) {
            campos.push("foto_path = ?");
            valores.push(usuario.foto_path);
        }

        if (usuario.rol !== undefined) {
            campos.push("rol = ?");
            valores.push(usuario.rol);
        }

        if (usuario.activo !== undefined) {
            campos.push("activo = ?");
            valores.push(usuario.activo);
        }

        valores.push(id);

        const sql = `
            UPDATE usuarios
            SET ${campos.join(", ")}
            WHERE id_usuario = ?
        `;

        const [result] = await connection.query(sql, valores);

        if (result.affectedRows === 0) {
            const error = new Error(`No se encontró el usuario con id ${id}`);
            error.status = 404;
            throw error;
        }

        const [usuarioActualizado] = await connection.query(
            `
    SELECT 
        id_usuario,
        documento,
        apellido,
        nombres,
        email,
        foto_path,
        rol,
        activo
    FROM usuarios
    WHERE id_usuario = ?
    `,
    [id]
);

return usuarioActualizado[0];

return usuarioActualizado[0];

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