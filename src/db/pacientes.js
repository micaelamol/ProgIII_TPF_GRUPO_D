import { connection } from "./connection.js";

export class Pacientes {
 static async listarPacientes() {
 try {
 //const sql = "SELECT * FROM pacientes WHERE activo = ?";
 const sql = "SELECT * FROM v_pacientes";

 const [rows] = await connection.query(sql);
 return rows;
 } catch (error) {
 throw error;
 }
 }

 static async listarPacientePorId(id) {
 try {
 const sql = "SELECT * FROM v_pacientes WHERE id_paciente = ?";
 const [rows] = await connection.query(sql, [id]);

 if (rows.length === 0) {
 const error = new Error(`No se encontró el paciente con id ${id}`);
 error.status = 404;
 throw error;
 }

 return rows[0];
 } catch (error) {
 throw error;
 }
 }

static async crearPaciente(paciente) {
  try {

    // Verificar usuario
    const [usuario] = await connection.query(
      `SELECT id_usuario
       FROM usuarios
       WHERE id_usuario = ?
         AND activo = 1`,
      [paciente.id_usuario]
    );

    if (usuario.length === 0) {
      const error = new Error(
        `Usuario con id ${paciente.id_usuario} no existe o está inactivo`
      );
      error.status = 400;
      throw error;
    }

    // Verificar obra social
    const [obraSocial] = await connection.query(
      `SELECT id_obra_social
       FROM obras_sociales
       WHERE id_obra_social = ?
         AND activo = 1`,
      [paciente.id_obra_social]
    );

    if (obraSocial.length === 0) {
      const error = new Error(
        `Obra social con id ${paciente.id_obra_social} no existe o está inactiva`
      );
      error.status = 400;
      throw error;
    }

    // Verificar que el usuario no sea ya paciente
    const [pacienteExistente] = await connection.query(
      `SELECT id_paciente
       FROM pacientes
       WHERE id_usuario = ?`,
      [paciente.id_usuario]
    );

    if (pacienteExistente.length > 0) {
      const error = new Error(
        "El usuario ya está registrado como paciente"
      );
      error.status = 400;
      throw error;
    }

    // Insertar
    const [result] = await connection.query(
      `INSERT INTO pacientes
       (id_usuario, id_obra_social)
       VALUES (?, ?)`,
      [
        paciente.id_usuario,
        paciente.id_obra_social
      ]
    );

    return {
      id_paciente: result.insertId,
      ...paciente
    };

  } catch (error) {
    throw error;
  }
}


static async actualizarPaciente(id, paciente) {
  try {

    const [existe] = await connection.query(
      "SELECT id_paciente FROM pacientes WHERE id_paciente = ?",
      [id]
    );

    if (existe.length === 0) {
      const error = new Error(`No existe el paciente ${id}`);
      error.status = 404;
      throw error;
    }

    const [obra] = await connection.query(
      "SELECT id_obra_social FROM obras_sociales WHERE id_obra_social = ? AND activo = 1",
      [paciente.id_obra_social]
    );

    if (obra.length === 0) {
      const error = new Error("La obra social no existe o está inactiva");
      error.status = 400;
      throw error;
    }

    await connection.query(
      `UPDATE pacientes
       SET id_obra_social = ?
       WHERE id_paciente = ?`,
      [paciente.id_obra_social, id]
    );

    return await this.listarPacientePorId(id);

  } catch (error) {
    throw error;
  }
}



static async eliminarPaciente(id) {
  try {

    const [paciente] = await connection.query(
      `SELECT id_usuario 
       FROM pacientes
       WHERE id_paciente = ?`,
      [id]
    );

    if (paciente.length === 0) {
      const error = new Error(`No existe el paciente ${id}`);
      error.status = 404;
      throw error;
    }

    await connection.query(
      `UPDATE usuarios
       SET activo = 0
       WHERE id_usuario = ?`,
      [paciente[0].id_usuario]
    );

    return {
      id_paciente: id,
      mensaje: "Paciente eliminado correctamente"
    };
     //return  await this.listarPacientePorId(id);

  
    

  } catch (error) {
    throw error;
  }
}
}


