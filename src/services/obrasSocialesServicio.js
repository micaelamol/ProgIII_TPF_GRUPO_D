import { ObrasSociales } from "../db/obrasSociales.js";

export default class ObrasSocialesServicio {

    static async obtenerObrasSociales() {
        const obrasSociales = await ObrasSociales.listarObrasSociales();
        return obrasSociales;
    }

    static async obtenerObraSocialPorId(id) {
        const obraSocial = await ObrasSociales.listarObraSocialPorId(id);
        return obraSocial;
    }

    static async crearObraSocial(body) {
        const nuevaObraSocial = {
            nombre: body.nombre,
            descripcion: body.descripcion || null,
            porcentaje_descuento: Number(body.porcentaje_descuento) || 0,
            es_particular: body.es_particular ? 1 : 0,
            activo: body.activo ? 1 : 0
        };

        const resultado = await ObrasSociales.crearObraSocial(nuevaObraSocial);
        return resultado;
    }

    static async actualizarObraSocial(id, body) {
        const obraSocialActualizada = {
            nombre: body.nombre,
            descripcion: body.descripcion || null,
            porcentaje_descuento: Number(body.porcentaje_descuento) || 0,
            es_particular: body.es_particular ? 1 : 0,
            activo: body.activo ? 1 : 0
        };

        const resultado = await ObrasSociales.actualizarObraSocial(id, obraSocialActualizada);
        return resultado;
    }

    static async eliminarObraSocial(id) {
        const resultado = await ObrasSociales.eliminarObraSocial(id);
        return resultado;
    }
}
