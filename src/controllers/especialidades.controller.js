import { EspecialidadesModel as Especialidades } from "../db/especialidades.js";
//read-browse
const obtenerEspecialidades = async (req,res) => {
    try {
        const listado = await Especialidades.listarEspecialidades();
        res.status(200).json({
            listado,
            estado: true, 
            msg: "Especialidad obtenida con éxito!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ estado: false, msg: "Error al obtener especialidades" });
    }
};

//add-post
const crearEspecialidad = async (req, res) => {
    try {
        const {nombre} = req.body;//el cliente nos envía los datos nuevos al servidor
        //req.params es la etiqueta en la dirección web (URL) que nos avisa a qué elemento (ej:qué ID) le tenemos que aplicar los datos
        const unaEspecialidad = await Especialidades.crearEspecialidad(nombre);

        res.status(201).json({
            unaEspecialidad,
            estado: true, 
            msg: "Especialidad creada con éxito!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ estado: false, msg: "Error al crear especialidad" });
    }
};

//update
const actualizarEspecialidad = async (req, res) => {
    try {
        const {id_especialidad} = req.params; //en rutas iria algo asi app.put('/especialidades/:id_especialidad', ...)
        const {nombre} = req.body;
        
        const unaEspecialidadActualizada = await Especialidades.actualizarEspecialidad(id_especialidad, nombre);

        res.status(200).json({
            unaEspecialidadActualizada,
            estado: true, 
            msg: `Especialidad con id ${id_especialidad} actualizada con éxito!`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ estado: false, msg: `Error al actualizar especialidad con id ${id_especialidad}` });
    }
};

// delete
const eliminarEspecialidad = async (req, res) => {
    try {
        const {id_especialidad} = req.params;
        
        const unaEspecialidadEliminada = await Especialidades.eliminarEspecialidad(id_especialidad);

        res.status(200).json({
            unaEspecialidadEliminada,
            estado: true, 
            msg: `Especialidad eliminada con éxito!`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ estado: false, msg: `Error al eliminar especialidad` });
    }
};
// Exportacion para routes se usaría como: router.get('/', EspecialidadesController.obtenerEspecialidades)
export const EspecialidadesController = {
    obtenerEspecialidades,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
};