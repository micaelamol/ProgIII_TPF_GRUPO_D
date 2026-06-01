import { connection } from "./connection.js";

export class Pacientes {

    static async listarPacientes() {
        try {
            const sql = "SELECT * FROM pacientes";
            const [rows] = await connection.query(sql);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async listarPacientePorId(id) {
        try {
            const sql = "SELECT * FROM pacientes WHERE id_paciente = ?";
            const [rows] = await connection.query(sql, [id]);

            if (rows.length === 0) {
                const error = new Error(`No se encontró el paciente con id ${id}`);
                error.status = 404;
                throw error;
            }

            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async crearPaciente(paciente) {
        try {
            const sql = `
                INSERT INTO pacientes
                (id_usuario, id_obra_social)
                VALUES (?, ?)
            `;

            const [result] = await connection.query(sql, [
                paciente.id_usuario,
                paciente.id_obra_social
            ]);

            return {
                id_paciente: result.insertId,
                ...paciente
            };
        } catch (error) {
            throw error;
        }
    }

    static async actualizarPaciente(id, paciente) {
        try {
            const sql = `
                UPDATE pacientes
                SET id_usuario = ?,
                    id_obra_social = ?
                WHERE id_paciente = ?
            `;

            const [result] = await connection.query(sql, [
                paciente.id_usuario,
                paciente.id_obra_social,
                id
            ]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontró el paciente con id ${id}`);
                error.status = 404;
                throw error;
            }

            return {
                id_paciente: id,
                ...paciente
            };
        } catch (error) {
            throw error;
        }
    }

    static async eliminarPaciente(id) {
        try {
            const sql = "DELETE FROM pacientes WHERE id_paciente = ?";

            const [result] = await connection.query(sql, [id]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontró el paciente con id ${id}`);
                error.status = 404;
                throw error;
            }

            return {
                status: 200,
                message: `Paciente con id ${id} eliminado exitosamente`
            };
        } catch (error) {
            throw error;
        }
    }
}