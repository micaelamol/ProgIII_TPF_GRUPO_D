import mysql from "mysql2/promise";
import { connection } from "./connection.js";

export class EspecialidadesModel {
  static async listarEspecialidades(param) {
    //si no trae parametros lista todas las especialidades, si trae un id de especialidad lista solo esa especialidad
    try {
      if (param == undefined) {
        const sql = "SELECT * FROM especialidades";
        const [rows] = await connection.query(sql); //devuelve una array de objetos con los datos de las especialidades
        //console.log("EspecialidadesModel.listarEspecialidades: Especialidades obtenidas:",rows,);
        return rows;
      } else {
        const sql = `SELECT * FROM especialidades WHERE id_especialidad = ?`;
        const [rows] = await connection.query(sql, [param]); //devuelve una array de objetos con los datos de las especialidades
        //console.log("EspecialidadesModel.listarEspecialidades: Especialidades obtenidas:",rows,);
        console.log('rows: ',rows);
        if(rows.length === 0){
          const error = new Error(`No se encontró la especialidad con id ${param}`);
          error.status = 404;
          
          throw error;
          //return {'error':`No se encontró la especialidad con id ${param}`, 'status': 404};
        }
        return rows;
      }
    } catch (error) {
      //console.error("ListarEspecialiddes: Error al listar especialidades",error,);
      throw  error
        
    } }
}
