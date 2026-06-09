import medicosServicio from "../services/medicosServicio.js";

// ------ GET todos los médicos --------
const obtenerMedicos = async (req, res) => {
    try {
        const listaMedicos = await medicosServicio.obtenerMedicos();
        res.status(200).json({
            listaMedicos,
            estado: true,
            msg: "Medicos obtenidos con éxito!",
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// ------ GET medico por ID --------
const obtenerMedicoPorId = async (req, res) => {
    try {
        const { id_medico } = req.params;
        const medico = await medicosServicio.obtenerMedicoPorId(id_medico);
        res.status(200).json({
            medico,
            estado: true,
            msg: "Medico obtenido con éxito!",
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// ------ POST crear medico --------

const crearMedico = async (req, res) => {
    try {
        const {id_usuario, id_especialidad, matricula, descripcion, valor_consulta} = req.body;

        const unMedico = await medicosServicio.crearMedico({id_usuario, id_especialidad, matricula, descripcion, valor_consulta});

        res.status(201).json({
            medico: unMedico,
            estado: true,
            msg: "Medico creado con éxito!",
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// ------ PUT modificar medico --------
const actualizarMedico = async (req, res) => {
    try {
        const { id_medico } = req.params;
        const { id_usuario, id_especialidad, matricula, descripcion, valor_consulta, activo } = req.body;

        const medicoActualizado = await medicosServicio.actualizarMedico(id_medico, {id_usuario, id_especialidad, matricula, descripcion, valor_consulta, activo
        });

        res.status(200).json({
            medico: medicoActualizado,
            estado: true,
            msg: `Medico con id ${id_medico} actualizado con exito!`,
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// DELETE - Eliminar (Soft delete/borrador logico)
const eliminarMedico = async (req, res) => {
    try {
        const { id_medico } = req.params;
        const medicoEliminado = await medicosServicio.eliminarMedico(id_medico);
        res.status(200).json({
            medico: medicoEliminado,
            estado: true,
            msg: `Medico con id ${id_medico} eliminado con exito!`,
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

export const medicosController = {
    obtenerMedicos,
    obtenerMedicoPorId,
    crearMedico,
    actualizarMedico,
    eliminarMedico
};