import { connection } from "./connection.js";

export class ObrasSociales {
  static async listarObrasSociales() {
    try {
      const sql = "SELECT * FROM obras_sociales WHERE activo = 1";
      const [rows] = await connection.query(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async listarObraSocialPorId(id) {
    try {
      const sql = "SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1";
      const [rows] = await connection.query(sql, [id]);

      if (rows.length === 0) {
        const error = new Error(`No se encontró la obra social con id ${id}`);
        error.status = 404;
        throw error;
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async crearObraSocial(obraSocial) {
    try {
      const sql = `
        INSERT INTO obras_sociales 
        (nombre, descripcion, porcentaje_descuento, es_particular, activo) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await connection.query(sql, [
        obraSocial.nombre,
        obraSocial.descripcion,
        obraSocial.porcentaje_descuento,
        obraSocial.es_particular,
        obraSocial.activo
      ]);

      return { id_obra_social: result.insertId, ...obraSocial };
    } catch (error) {
      throw error;
    }
  }

  static async actualizarObraSocial(id, obraSocial) {
    try {
      const sql = `
        UPDATE obras_sociales 
        SET nombre=?, descripcion=?, porcentaje_descuento=?, es_particular=?, activo=? 
        WHERE id_obra_social=?
      `;
      const [result] = await connection.query(sql, [
        obraSocial.nombre,
        obraSocial.descripcion,
        obraSocial.porcentaje_descuento,
        obraSocial.es_particular,
        obraSocial.activo,
        id
      ]);

      if (result.affectedRows === 0) {
        const error = new Error(`No se encontró la obra social con id ${id}`);
        error.status = 404;
        throw error;
      }
      return { id_obra_social: id, ...obraSocial };
    } catch (error) {
      throw error;
    }
  }

  static async eliminarObraSocial(id) {
    try {
      const sql = "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?";
      const [result] = await connection.query(sql, [id]);

      if (result.affectedRows === 0) {
        const error = new Error(`No se encontró la obra social con id ${id}`);
        error.status = 404;
        throw error;
      }
      return { status: 200, message: `Obra social con id ${id} eliminada exitosamente` };
    } catch (error) {
      throw error;
    }
  }
}
