import EspecialidadesServicio from "../services/especialidadesServicio.js";

// GET todas
const obtenerEspecialidades = async (req, res) => {
    try {
        const listado = await EspecialidadesServicio.obtenerEspecialidades();
        res.status(200).json({
            listado,
            estado: true,
            msg: "Especialidades obtenidas con éxito!",
        });
    } catch (error) {
        // console.log(error); 
        res.status(500).json({ estado: false, msg: "Error al obtener especialidades" });
    }
};

// GET por ID
const obtenerEspecialidadPorId = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const especialidad = await EspecialidadesServicio.obtenerEspecialidadPorId(id_especialidad);
        res.status(200).json({
            especialidad,
            estado: true,
            msg: "Especialidad obtenida con éxito!",
        });
    } catch (error) {
        // console.log(error);
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// POST
const crearEspecialidad = async (req, res) => {
    try {
        const { nombre } = req.body;
        const unaEspecialidad = await EspecialidadesServicio.crearEspecialidad(nombre);
        res.status(201).json({
            especialidad: unaEspecialidad,
            estado: true,
            msg: "Especialidad creada con éxito!",
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ estado: false, msg: "Error al crear especialidad" });
    }
};

// PUT
const actualizarEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const { nombre } = req.body;
        const unaEspecialidadActualizada = await EspecialidadesServicio.actualizarEspecialidad(id_especialidad, nombre);
        res.status(200).json({
            especialidad: unaEspecialidadActualizada,
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
        const unaEspecialidadEliminada = await EspecialidadesServicio.eliminarEspecialidad(id_especialidad);
        res.status(200).json({
            especialidad: unaEspecialidadEliminada,
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