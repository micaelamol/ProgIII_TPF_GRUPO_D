import { Pacientes } from "../db/pacientes.js";

export default class PacientesServicio {

    static async obtenerPacientes() {
        return await Pacientes.listarPacientes();
    }

    static async obtenerPacientePorId(id) {
        return await Pacientes.listarPacientePorId(id);
    }

    static async crearPaciente(body) {

        const nuevoPaciente = {
            id_usuario: Number(body.id_usuario),
            id_obra_social: Number(body.id_obra_social)
        };

        return await Pacientes.crearPaciente(nuevoPaciente);
    }

    static async actualizarPaciente(id, body) {

        const pacienteActualizado = {
            id_usuario: Number(body.id_usuario),
            id_obra_social: Number(body.id_obra_social)
        };

        return await Pacientes.actualizarPaciente(
            id,
            pacienteActualizado
        );
    }

    static async eliminarPaciente(id) {
        return await Pacientes.eliminarPaciente(id);
    }
}