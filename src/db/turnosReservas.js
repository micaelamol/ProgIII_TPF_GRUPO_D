import { connection } from "./connection.js";

export default class TurnosReservas {

    crear = async (turnoReserva) => {
        const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total } = turnoReserva;

        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sql = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total)
            VALUES (?,?,?,?,?)`;
            const [result] = await conn.execute(sql, [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]);

            await conn.commit();

            if (result.affectedRows === 0) {
                return null;
            }
            return result.insertId;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }

    buscarTodos = async () => {
        const sql = `SELECT * FROM turnos_reservas WHERE activo = 1`;
        const [turnos] = await connection.execute(sql);
        return turnos;
    }

    turnosDeUnMedico = async (id_usuario) => {
        const sql = `SELECT 
                    tr.id_turno_reserva,
                    tr.fecha_hora,
                    tr.valor_total,
                    tr.atendido,
                    u.nombres AS nombre_paciente,
                    u.apellido AS apellido_paciente
                FROM usuarios AS u_medico
                INNER JOIN medicos AS m ON m.id_usuario = u_medico.id_usuario
                INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
                INNER JOIN pacientes AS p ON p.id_paciente = tr.id_paciente
                INNER JOIN usuarios AS u ON u.id_usuario = p.id_usuario
                WHERE u_medico.id_usuario = ? AND tr.activo = 1;`
        const [turnos] = await connection.execute(sql, [id_usuario]);
        return turnos;
    }

    turnosDeUnPaciente = async (id_usuario) => {
        const sql = `SELECT 
                    tr.id_turno_reserva,
                    tr.fecha_hora,
                    tr.valor_total,
                    tr.atendido,
                    u.nombres AS nombre_medico,
                    u.apellido AS apellido_medico,
                    e.nombre AS especialidad
                FROM usuarios AS u_paciente
                INNER JOIN pacientes AS p ON p.id_usuario = u_paciente.id_usuario
                INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
                INNER JOIN medicos AS m ON m.id_medico = tr.id_medico
                INNER JOIN usuarios AS u ON u.id_usuario = m.id_usuario
                INNER JOIN especialidades AS e ON e.id_especialidad = m.id_especialidad
                WHERE u_paciente.id_usuario = ? AND tr.activo = 1`
        const [turnos] = await connection.execute(sql, [id_usuario]);
        return turnos;
    }

    marcarAtendido = async (id) => {
        const sql = `UPDATE turnos_reservas SET atendido = 1 WHERE id_turno_reserva = ?`;
        const [result] = await connection.execute(sql, [id]);
        return result.affectedRows;
    }

    eliminarTurno = async (id) => {
        const sql = `UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ?`;
        const [result] = await connection.execute(sql, [id]);
        return result.affectedRows;
    }

    obtenerEstadisticas = async () => {
        const [result] = await connection.execute('CALL sp_estadisticas_turnos()');
        return result[0];
    }

    obtenerEstadisticasPorEspecialidad = async () => {
        const [result] = await connection.execute('CALL sp_estadisticas_por_especialidad()');
        return result[0];
    }
}