import { MedicosBD } from "../db/medicos.js";
import { Usuarios } from "../db/usuarios.js"; 

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

    // --- CREAR MEDICO ---
    static async crearMedico(data) {
        // 1. verificacion de que el usuario existe
        const usuarioExiste = await Usuarios.obtenerUsuarioPorId(data.id_usuario);
        if (!usuarioExiste) {
            throw { status: 404, message: "El ID de usuario ingresado no existe en la base de datos." };
        }

        const resultado = await MedicosBD.crearMedico(data);
        return { id_medico: resultado.insertId, ...data, activo: 1 };
    }

    static async actualizarMedico(id_medico, data) {
        const medicoExistente = await MedicosBD.obtenerMedicoPorId(id_medico);
        if (!medicoExistente) {
            throw { status: 404, message: "Médico no encontrado para actualizar" };
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
        return { id_medico, msg: "Medico eliminado" };
    }
}