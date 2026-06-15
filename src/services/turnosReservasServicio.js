import TurnosReservas from "../db/turnosReservas.js";
import MedicosServicio from "../services/medicosServicio.js";
import PacientesServicio from "../services/pacientesServicio.js";
import ObrasSocialesServicio from "../services/obrasSocialesServicio.js";
import InformeServicio from "../services/informesServicios.js"; //  importar el servicio de informes

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


    //  NUEVO MÉTODO: genera informe PDF por especialidad
   porEspecialidad = async () => {
    // 1. Buscar datos desde la capa DB
    const datos = await this.turnosReservas.obtenerEstadisticasPorEspecialidad();

    // 2. Generar PDF con esos datos usando InformeServicio
    const pdf = await InformeServicio.reportePorEspecialidades(datos);

    // 3. Devolver buffer y headers
    return {
        buffer: pdf,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="reporte.pdf"'
        }
    };
}

///




    buscarTodas = async (usuario) => {
        if (usuario.rol === 1) {
            return this.turnosReservas.turnosDeUnMedico(usuario.id_usuario);
        } else if (usuario.rol === 2) {
            return this.turnosReservas.turnosDeUnPaciente(usuario.id_usuario);
        } else {
            // admin
            return this.turnosReservas.buscarTodos();
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

    obtenerEstadisticas = async () => {
        return this.turnosReservas.obtenerEstadisticas();
    }

    obtenerEstadisticasPorEspecialidad = async () => {
    return this.turnosReservas.obtenerEstadisticasPorEspecialidad();
}
}
