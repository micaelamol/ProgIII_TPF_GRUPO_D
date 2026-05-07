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
        const sql = `SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1`;
        const [rows] = await connection.query(sql, [param]); //devuelve una array de objetos con los datos de las especialidades

        if (rows.length === 0) {
          const error = new Error(
            `No se encontró la especialidad con id ${param}`,
          );
          error.status = 404;

          throw error;
        }
        return rows;
      }
    } catch (error) {
      throw error;
    }
  }
  static async crearEspecialidad(nombre) {
    try {
      const sql = "INSERT INTO especialidades (nombre) VALUES (?)";
      const [result] = await connection.query(sql, [nombre]);

      return { id: result.insertId, nombre };
    } catch (error) {
      throw error;
    }
  }

   static async eliminarEspecialidad(id) {
    try {
      const sql = "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?";
      const [result] = await connection.query(sql, [id]);
      if (result.affectedRows === 0) {
        const error = new Error(`No se encontró la especialidad con id ${id}`);
        error.status = 404;
        throw error;
      }else{
        return { status: 200, message: `Especialidad con id ${id} eliminada exitosamente` };
      }
    } catch (error) {
      throw error;
    }
  }

        //actualizar el nombre de la especialidad en la base de datos, recibe el id de la especialidad a actualizar y el nuevo nombre, devuelve un mensaje de éxito o error
  static async actualizarEspecialidad(id, nombre) {
    try {
      const sql = "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?";
      const [result] = await connection.query(sql, [nombre, id]);
      if (result.affectedRows === 0) {
        const error = new Error(`No se encontró la especialidad con id ${id}`);
        error.status = 404;
        throw error;
      }else{
        return { status: 200, message: `Especialidad con id ${id} actualizada exitosamente` };
      }
    } catch (error) {
      throw error;
    }
  }
}
