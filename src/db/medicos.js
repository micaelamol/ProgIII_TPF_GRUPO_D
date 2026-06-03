import { connection } from "./connection.js";

export class MedicosBD {
    static async listarMedicos() {
        const sql = "SELECT * FROM medicos WHERE activo = 1"; 
        const [rows] = await connection.execute(sql);
        return rows;
    }

    static async obtenerMedicoPorId(id_medico) {
        const sql = "SELECT * FROM medicos WHERE id_medico = ? AND activo = 1"; 
        const [rows] = await connection.execute(sql, [id_medico]);
        return rows[0];
    }

    static async crearMedico({ id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) {
        const sql = "INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta, activo) VALUES (?, ?, ?, ?, ?, 1)";
        // si descripcion no viene le pongo null
        const [result] = await connection.execute(sql, [id_usuario, id_especialidad, matricula, descripcion || null, valor_consulta]);
        return result;
    }

    static async actualizarMedico(id_medico, { id_usuario, id_especialidad, matricula, descripcion, valor_consulta, activo }) {
        const sql = "UPDATE medicos SET id_usuario = ?, id_especialidad = ?, matricula = ?, descripcion = ?, valor_consulta = ?, activo = ? WHERE id_medico = ?";
        const [result] = await connection.execute(sql, [id_usuario, id_especialidad, matricula, descripcion || null, valor_consulta, activo, id_medico]);
        return result;
    }
// Soft delete
    static async eliminarMedico(id_medico) {
        const sql = "UPDATE medicos SET activo = 0 WHERE id_medico = ?";
        const [result] = await connection.execute(sql, [id_medico]);
        return result;
    }
}