import TurnosReservas from "../db/turnosReservas.js";
import MedicosServicio from "../services/medicosServicio.js";
import PacientesServicio from "../services/pacientesServicio.js";
import ObrasSocialesServicio from "../services/obrasSocialesServicio.js";

export default class TurnosReservasServicio {

    constructor() {
        this.turnosReservas = new TurnosReservas();
        this.medicos = new MedicosServicio();
        this.pacientes = new PacientesServicio();
        this.obrasSociales = new ObrasSocialesServicio();
    }

    // buscarPorId = async (idTurnoReserva) => {}


    crear = async (turnoReserva) => {
        const medico = await this.medicos.obtenerMedicoPorId(turnoReserva.id_medico);
        const paciente = await this.pacientes.buscarPorId(turnoReserva.id_paciente);
        const obra_social = await this.obrasSociales.obtenerObraSocialPorId(paciente.id_obra_social);

        let valor = medico.valor_consulta;

        if (obra_social.es_particular === 0) {
            valor = valor - (obra_social.porcentaje_descuento / 100 * valor);
        }

        turnoReserva.valor_total = valor;
        turnoReserva.id_obra_social = paciente.id_obra_social;

        const id = await this.turnosReservas.crear(turnoReserva);
        return id;
    }

    // Agregar if/else para validar el rol
    buscarTodas = async (usuario) => {

        // medico
        if (usuario.rol === 1) {
            return this.turnosReservas.turnosDeUnMedico(usuario.id_usuario);
        }
        // Paciente
        else {
            return this.turnosReservas.turnosDeUnPaciente(usuario.id_usuario);
        }
    }

    modificar = async (id) => {
        const resultado = await this.turnosReservas.marcarAtendido(id);
        if (resultado === 0) {
            throw new Error('Turno no encontrado');
        }
        return resultado;
}

}