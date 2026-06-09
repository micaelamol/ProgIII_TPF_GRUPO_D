import { connection } from "./connection.js";

export default class TurnosReservas {

    crear = async (turnoReserva) => {
        const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total } = turnoReserva;
        const sql = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total)
            VALUES (?,?,?,?,?)`;
        const [result] = await connection.execute(sql, [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]);
        if (result.affectedRows === 0) {
            return null;
        }
        return result.insertId;
    }

    buscarTodos = async () => {
    const sql = `SELECT * FROM turnos_reservas WHERE activo = 1`;
    const [turnos] = await connection.execute(sql);
    return turnos;
}
}