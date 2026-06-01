import PacientesServicio from "../services/pacientesServicio.js";

const obtenerPacientes = async (req, res) => {
    try {
        const listado = await PacientesServicio.obtenerPacientes();

        res.status(200).json({
            listado,
            estado: true,
            msg: "Pacientes obtenidos con éxito!"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

const obtenerPacientePorId = async (req, res) => {
    try {
        const { id_paciente } = req.params;

        const paciente =
            await PacientesServicio.obtenerPacientePorId(id_paciente);

        res.status(200).json({
            paciente,
            estado: true,
            msg: "Paciente obtenido con éxito!"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

const crearPaciente = async (req, res) => {
    try {
        const paciente =
            await PacientesServicio.crearPaciente(req.body);

        res.status(201).json({
            paciente,
            estado: true,
            msg: "Paciente creado con éxito!"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

const actualizarPaciente = async (req, res) => {
    try {
        const { id_paciente } = req.params;

        const pacienteActualizado =
            await PacientesServicio.actualizarPaciente(
                id_paciente,
                req.body
            );

        res.status(200).json({
            paciente: pacienteActualizado,
            estado: true,
            msg: `Paciente con id ${id_paciente} actualizado con éxito!`
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

const eliminarPaciente = async (req, res) => {
    try {
        const { id_paciente } = req.params;

        const pacienteEliminado =
            await PacientesServicio.eliminarPaciente(id_paciente);

        res.status(200).json({
            paciente: pacienteEliminado,
            estado: true,
            msg: "Paciente eliminado con éxito!"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

export const PacientesController = {
    obtenerPacientes,
    obtenerPacientePorId,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
};