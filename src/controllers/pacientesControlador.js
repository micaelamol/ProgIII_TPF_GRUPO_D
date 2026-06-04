import pacientesServicio from "../services/pacientesServicio.js";

//Get todos los pacientes
const obtenerPacientes = async (req, res) => {
 try {
 const listadoPacientes = await pacientesServicio.obtenerPacientes();

 return res.status(200).json({
 listadoPacientes,
estado: true,
 msg: "Pacientes obtenidos con éxito!"
 });
 } catch (error) {
 return res.status(error.status || 500).json({estado: false, msg: error.message});
 }
};

//Get pacientes por ID
const obtenerPacientePorId = async (req, res) => {
 try {
 const { id_paciente } = req.params;
const paciente = await pacientesServicio.obtenerPacientePorId(id_paciente);
 return res.status(200).json({
 paciente,
 estado: true,
msg: "Paciente obtenido con éxito!"
});
 } catch (error) {
 return res.status(error.status || 500).json({estado: false, msg: error.message });
 }
};


//POST crear paciente
const crearPaciente = async (req, res) => {
 try {
 const paciente =
 await pacientesServicio.crearPaciente(req.body);

 return res.status(201).json({
 paciente,
 estado: true,
 msg: "Paciente creado con éxito!"
 });
 } catch (error) {
return res.status(error.status || 500).json({
 estado: false,
 msg: error.message
 });
 }
};

//PUT actualizar paciente
const actualizarPaciente = async (req, res) => {
 try {
  const paciente = await pacientesServicio.actualizarPaciente(
      req.params.id_paciente,
      req.body
    );

     return res.status(200).json({
      paciente,
      estado: true,
      msg: "Paciente actualizado con éxito!"
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      estado: false,
      msg: error.message
    });
  }
}

//DELETE - Soft delete
const eliminarPaciente = async (req, res) => {
  try {
    const resultado = await pacientesServicio.eliminarPaciente(
      req.params.id_paciente
    );
return res.status(200).json({
      resultado,
      estado: true,
      msg: "Paciente eliminado con éxito!"
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      estado: false,
      msg: error.message
    });
  }
}

export const pacientesController = {
 obtenerPacientes,
 obtenerPacientePorId,
 crearPaciente,
 actualizarPaciente,
 eliminarPaciente
};

