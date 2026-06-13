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
        const sql = `SELECT 
                    id_turno_reserva,
                    id_medico,
                    id_paciente,
                    id_obra_social,
                    DATE_FORMAT(fecha_hora, '%d/%m/%Y %H:%i') AS fecha_hora,
                    valor_total,
                    atendido,
                    activo
                FROM turnos_reservas WHERE activo = 1`;
        const [turnos] = await connection.execute(sql);
        return turnos;
    }

    turnosDeUnMedico = async (id_usuario) => {
        const sql = `SELECT 
                    tr.id_turno_reserva,
                    DATE_FORMAT(tr.fecha_hora, '%d/%m/%Y %H:%i') AS fecha_hora,
                    tr.valor_total,
                    CASE WHEN tr.atendido = 1 THEN 'Atendido' ELSE 'Pendiente' END AS estado_turno,
                    vp.nombres AS nombre_paciente,
                    vp.apellido AS apellido_paciente
                FROM medicos AS m
                INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
                INNER JOIN v_pacientes AS vp ON vp.id_paciente = tr.id_paciente
                WHERE m.id_usuario = ? AND tr.activo = 1;`
        const [turnos] = await connection.execute(sql, [id_usuario]);
        return turnos;
    }

    turnosDeUnPaciente = async (id_usuario) => {
        const sql = `SELECT 
                    tr.id_turno_reserva,
                    DATE_FORMAT(tr.fecha_hora, '%d/%m/%Y %H:%i') AS fecha_hora,
                    tr.valor_total,
                    CASE WHEN tr.atendido = 1 THEN 'Atendido' ELSE 'Pendiente' END AS estado_turno,
                    vm.nombres AS nombre_medico,
                    vm.apellido AS apellido_medico
                FROM pacientes AS p
                INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
                INNER JOIN v_medicos AS vm ON vm.id_medico = tr.id_medico
                WHERE p.id_usuario = ? AND tr.activo = 1`
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
