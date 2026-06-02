import { MedicosBD } from "../db/medicos.js";

export default class MedicosServicio {
    static async obtenerMedicos() {
        return await MedicosBD.listarMedicos();
    }

    static async obtenerMedicoPorId(id_medico) {
        const medico = await MedicosBD.obtenerMedicoPorId(id_medico);
        if (!medico) {
            throw { status: 404, message: "Medico no encontrado en la base de datos" };
        }
        return medico;
    }

    static async crearMedico(data) {
        const result = await MedicosBD.crearMedico(data);
        return { id_medico: result.insertId, ...data, activo: 1 };
    }

    static async actualizarMedico(id_medico, data) {
        const medicoExistente = await MedicosBD.obtenerMedicoPorId(id_medico);
        if (!medicoExistente) {
            throw { status: 404, message: "Medico no encontrado para actualizar" };
        }
        
        await MedicosBD.actualizarMedico(id_medico, data);
        return { id_medico, ...data };
    }

    static async eliminarMedico(id_medico) {
        const medicoExistente = await MedicosBD.obtenerMedicoPorId(id_medico);
        if (!medicoExistente) {
            throw { status: 404, message: "Medico no encontrado para eliminar" };
        }
        
        await MedicosBD.eliminarMedico(id_medico);
        return { id_medico, activo: 0, msg: "Borrado aplicado" };
    }
}