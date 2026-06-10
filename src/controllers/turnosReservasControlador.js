import TurnosReservas from "../services/turnosReservasServicio.js";

export default class TurnosReservasControlador {

    constructor() {
        this.turnosReservas = new TurnosReservas();
    }

    crear = async (req, res) => {
        try{            
            const turnoReserva = req.body;

            const nuevoTurnoReserva = await this.turnosReservas.crear(turnoReserva);
            
            if(!nuevoTurnoReserva || nuevoTurnoReserva.length === 0){
                return res.status(400).json({
                    estado: false, 
                    mensaje: 'No fue posible crear el turno.'
                });
            }

            return res.status(201).json({
                estado: true,
                mensaje: 'Turno creado correctamente',
                datos: nuevoTurnoReserva
            });

        }catch(error){
            console.log(`Error en POST /turnos-reservas ${error}`);
            res.status(500).json(
                {
                    'estado': false, 
                    'mensaje': 'Error interno.'
                }
            );
        }
    }

    buscarTodos = async (req, res) => {
    try {
        const usuario = req.usuario;
        const turnos = await this.turnosReservas.buscarTodas();
        res.status(200).json({ estado: true, mensaje: 'Turnos encontrados: ', turnos });
    } catch(error) {
        console.log(`Error en GET /turnos ${error}`);
        res.status(500).json({ estado: false, mensaje: 'Error interno' });
    }
}

    marcarAtendido = async (req, res) => {
        try {
            const id = req.params.id;
            await this.turnosReservas.modificar(id);
            res.status(200).json({ estado: true, mensaje: 'Turno marcado como atendido' });
        } catch(error) {
            if (error.message === 'Turno no encontrado') {
                return res.status(404).json({ estado: false, mensaje: 'Turno no encontrado' });
            }
            console.log(`Error en PATCH /turnos-reservas ${error}`);
            // devulevo status code 500 si fue otro error
            res.status(500).json({ estado: false, mensaje: 'Error interno.' });
        }
    }
}