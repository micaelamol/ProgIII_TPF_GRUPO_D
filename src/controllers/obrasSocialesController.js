import ObrasSocialesServicio from "../services/obrasSocialesServicio.js";

// GET todas
const obtenerObrasSociales = async (req, res) => {
    try {
        const listado = await ObrasSocialesServicio.obtenerObrasSociales();
        res.status(200).json({
            listado,
            estado: true,
            msg: "Obras sociales obtenidas con éxito!",
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// GET por ID
const obtenerObraSocialPorId = async (req, res) => {
    try {
        const { id_obra_social } = req.params;
        const obraSocial = await ObrasSocialesServicio.obtenerObraSocialPorId(id_obra_social);
        res.status(200).json({
            obraSocial,
            estado: true,
            msg: "Obra social obtenida con éxito!",
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// POST - Crear una
const crearObraSocial = async (req, res) => {
    try {
        const { nombre, descripcion, porcentaje_descuento, es_particular, activo } = req.body;

        if (!nombre) {
            return res.status(400).json({ estado: false, msg: "El campo 'nombre' es obligatorio" });
        }
        if (isNaN(porcentaje_descuento)) {
            return res.status(400).json({ estado: false, msg: "El campo 'porcentaje_descuento' debe ser numérico" });
        }
        if (![0,1].includes(Number(es_particular))) {
            return res.status(400).json({ estado: false, msg: "El campo 'es_particular' debe ser 0 o 1" });
        }
        if (![0,1].includes(Number(activo))) {
            return res.status(400).json({ estado: false, msg: "El campo 'activo' debe ser 0 o 1" });
        }

        const unaObraSocial = await ObrasSocialesServicio.crearObraSocial({
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular,
            activo
        });

        res.status(201).json({
            obraSocial: unaObraSocial,
            estado: true,
            msg: "Obra social creada con éxito!",
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// PUT - Actualizar
const actualizarObraSocial = async (req, res) => {
    try {
        const { id_obra_social } = req.params;
        const { nombre, descripcion, porcentaje_descuento, es_particular, activo } = req.body;

        const obraSocialActualizada = await ObrasSocialesServicio.actualizarObraSocial(id_obra_social, {
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular,
            activo
        });

        res.status(200).json({
            obraSocial: obraSocialActualizada,
            estado: true,
            msg: `Obra social con id ${id_obra_social} actualizada con éxito!`,
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

// DELETE - Eliminar (Soft delete)
const eliminarObraSocial = async (req, res) => {
    try {
        const { id_obra_social } = req.params;
        const obraSocialEliminada = await ObrasSocialesServicio.eliminarObraSocial(id_obra_social);
        res.status(200).json({
            obraSocial: obraSocialEliminada,
            estado: true,
            msg: `Obra social eliminada con éxito!`,
        });
    } catch (error) {
        res.status(error.status || 500).json({ estado: false, msg: error.message });
    }
};

export const ObrasSocialesController = {
    obtenerObrasSociales,
    obtenerObraSocialPorId,
    crearObraSocial,
    actualizarObraSocial,
    eliminarObraSocial
};