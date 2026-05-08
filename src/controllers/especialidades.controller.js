import { Especialidades } from "../db/especialidades.js";

// GET todas
const obtenerEspecialidades = async (req, res) => {
    try {
        const listado = await Especialidades.listarEspecialidades();
        res.status(200).json({
            listado,
            estado: true,
            msg: "Especialidades obtenidas con éxito!",
        });
    } catch (error) {
        /* console.log(error); */
        res.status(500).json({ estado: false, msg: "Error al obtener especialidades" });
    }
};

// GET por ID
const obtenerEspecialidadPorId = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const listado = await Especialidades.listarEspecialidadPorId(id_especialidad);
        res.status(200).json({
            listado,
            estado: true,
            msg: "Especialidad obtenida con éxito!",
        });
    } catch (error) {
        /* console.log(error); */
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// POST
const crearEspecialidad = async (req, res) => {
    try {
        const { nombre } = req.body;
        const unaEspecialidad = await Especialidades.crearEspecialidad(nombre);
        res.status(201).json({
            unaEspecialidad,
            estado: true,
            msg: "Especialidad creada con éxito!",
        });
    } catch (error) {
        /* console.log(error); */
        res.status(500).json({ estado: false, msg: "Error al crear especialidad" });
    }
};

// PUT
const actualizarEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const { nombre } = req.body;
        const unaEspecialidadActualizada = await Especialidades.actualizarEspecialidad(id_especialidad, nombre);
        res.status(200).json({
            unaEspecialidadActualizada,
            estado: true,
            msg: `Especialidad con id ${id_especialidad} actualizada con éxito!`,
        });
    } catch (error) {
        /* console.log(error); */
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// DELETE
const eliminarEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const unaEspecialidadEliminada = await Especialidades.eliminarEspecialidad(id_especialidad);
        res.status(200).json({
            unaEspecialidadEliminada,
            estado: true,
            msg: `Especialidad eliminada con éxito!`,
        });
    } catch (error) {
        /* console.log(error); */
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

export const EspecialidadesController = {
    obtenerEspecialidades,
    obtenerEspecialidadPorId,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
};