import { Pacientes } from "../db/pacientes.js";

export default class PacientesServicio {

  static async obtenerPacientes() {
  return await Pacientes.listarPacientes();
  }

 static async obtenerPacientePorId(id) {
const paciente = await Pacientes.listarPacientePorId(id);
 if (!paciente) {
 throw {status: 404, message: "Paciente no encontrado en la base de datos" };
 }
 return paciente;
 }

 static async crearPaciente(body) {

 const nuevoPaciente = {
 id_usuario: Number(body.id_usuario),
 id_obra_social: Number(body.id_obra_social)
 };

 const resultado = await Pacientes.crearPaciente(nuevoPaciente);
 return resultado;
 }

 static async actualizarPaciente(id, body) {
 const pacienteActualizado = { 
 id_obra_social: Number(body.id_obra_social)
 };

 const resultado = await Pacientes.actualizarPaciente(id,pacienteActualizado);
 return resultado;

 }

 static async eliminarPaciente(id) {
 const resultado = await Pacientes.eliminarPaciente(id);
 return resultado;
 }
}

