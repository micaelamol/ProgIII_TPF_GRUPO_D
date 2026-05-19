import { Especialidades } from "../db/especialidades.js"

export default class EspecialidadesServicio {

    static async obtenerEspecialidades() {

        const especialidades = await Especialidades.listarEspecialidades();
        return especialidades;

    }

    static async obtenerEspecialidadPorId(id) {
        const especialidad = await Especialidades.listarEspecialidadPorId(id);
        return especialidad
    }

    static async crearEspecialidad(especialidad) {
        const nuevaEspecialidad = await Especialidades.crearEspecialidad(especialidad);
        return nuevaEspecialidad;
    }

    static async actualizarEspecialidad(id, especialidad) {
        const especialidadActualizada = await Especialidades.actualizarEspecialidad(id, especialidad);
        return especialidadActualizada;
    }

    static async eliminarEspecialidad(id) {
        const resultado = await Especialidades.eliminarEspecialidad(id);
        return resultado;
    }


}