import TurnosReservas from "../services/turnosReservasServicio.js";

export default class TurnosReservasControlador {

    constructor() {
        this.turnosReservas = new TurnosReservas();
    }

    crear = async (req, res) => {
        try {
            const turnoReserva = req.body;

            const nuevoTurnoReserva = await this.turnosReservas.crear(turnoReserva);

            if (!nuevoTurnoReserva || nuevoTurnoReserva.length === 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'No fue posible crear el turno'
                });
            }

            return res.status(201).json({
                estado: true,
                mensaje: 'Turno creado correctamente',
                datos: { id_turno_reserva: nuevoTurnoReserva }
            });

        } catch (error) {
            console.log(`Error en POST /turnos-reservas ${error}`);

            if (error.status === 404) {
                return res.status(404).json({ estado: false, mensaje: error.message });
            }

            res.status(500).json({ estado: false, mensaje: 'Error interno' });
        }
    }

    buscarTodos = async (req, res) => {
        try {
            const usuario = req.user;

            if (!usuario) {
                return res.status(401).json({ estado: false, mensaje: 'No autorizado' });
            }
            const turnos = await this.turnosReservas.buscarTodas(usuario);
            res.status(200).json({ estado: true, mensaje: 'Turnos encontrados: ', turnos });
        } catch (error) {
            console.log(`Error en GET /turnos ${error}`);
            res.status(500).json({ estado: false, mensaje: 'Error interno' });
        }
    }

    marcarAtendido = async (req, res) => {
        try {
            const id = req.params.id;
            await this.turnosReservas.marcarTurnoAtendido(id);
            res.status(200).json({ estado: true, mensaje: 'Turno marcado como atendido' });
        } catch (error) {
            if (error.status === 404) {
                return res.status(404).json({ estado: false, mensaje: error.message });
            }
            console.log(`Error en PATCH /turnos-reservas ${error}`);
            res.status(500).json({ estado: false, mensaje: 'Error interno' });
        }
    }

    eliminarTurno = async (req, res) => {
        try {
            const id = req.params.id;
            await this.turnosReservas.eliminarTurno(id);
            res.status(200).json({ estado: true, mensaje: 'Turno eliminado correctamente' });
        } catch (error) {
            if (error.status === 404) {
                return res.status(404).json({ estado: false, mensaje: error.message });
            }
            console.log(`Error en DELETE /turnos-reservas ${error}`);
            res.status(500).json({ estado: false, mensaje: 'Error interno' });
        }
    }

    obtenerEstadisticas = async (req, res) => {
        try {
            const estadisticas = await this.turnosReservas.obtenerEstadisticas();
            res.status(200).json({ estado: true, datos: estadisticas });
        } catch (error) {
            console.log(`Error en GET /turnos-reservas/estadisticas ${error}`);
            res.status(500).json({ estado: false, mensaje: 'Error interno.' });
        }
    }
}