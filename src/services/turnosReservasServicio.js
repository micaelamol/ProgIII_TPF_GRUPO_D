import TurnosReservas from "../db/turnosReservas.js";
import MedicosServicio from "../services/medicosServicio.js";
import PacientesServicio from "../services/pacientesServicio.js";
import ObrasSocialesServicio from "../services/obrasSocialesServicio.js";

export default class TurnosReservasServicio {

    constructor() {
        this.turnosReservas = new TurnosReservas();
    }

    crear = async (turnoReserva) => {
        const medico = await MedicosServicio.obtenerMedicoPorId(turnoReserva.id_medico);
        const paciente = await PacientesServicio.obtenerPacientePorId(turnoReserva.id_paciente);
        const obra_social = await ObrasSocialesServicio.obtenerObraSocialPorId(paciente.id_obra_social);

        let valor = medico.valor_consulta;

        if (obra_social.es_particular === 0) {
            valor = valor - (obra_social.porcentaje_descuento / 100 * valor);
        }

        turnoReserva.valor_total = valor;
        turnoReserva.id_obra_social = paciente.id_obra_social;

        const id = await this.turnosReservas.crear(turnoReserva);
        return id;
    }

    buscarTodas = async (usuario) => {
        if (usuario.rol === 1) {
            return this.turnosReservas.turnosDeUnMedico(usuario.id_usuario);
        } else {
            return this.turnosReservas.turnosDeUnPaciente(usuario.id_usuario);
        }
    }

    marcarTurnoAtendido = async (id) => {
        const resultado = await this.turnosReservas.marcarAtendido(id);
        if (resultado === 0) {
            throw { status: 404, message: 'Turno no encontrado' };
        }
        return resultado;
    }

    eliminarTurno = async (id) => {
        const resultado = await this.turnosReservas.eliminarTurno(id);
        if (resultado === 0) {
            throw { status: 404, message: 'Turno no encontrado.' };
        }
        return resultado;
    }
}