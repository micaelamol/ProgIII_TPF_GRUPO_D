import { Router } from "express";
import { check, param } from "express-validator";
import { pacientesController } from "../../controllers/pacientesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

//GET
router.get("/", pacientesController.obtenerPacientes);

//Get paciente por ID
router.get(
 "/:id_paciente",
 [
 param("id_paciente", "El ID debe ser un número entero").isInt(),
 validarCampos
 ],
 pacientesController.obtenerPacientePorId

);

//POST  crear paciente
router.post(
 "/", [
 check("id_usuario")
 .isInt()
 .withMessage("El id_usuario debe ser un número entero."),

 check("id_obra_social")
 .isInt()
 .withMessage("El id_obra_social debe ser un número entero."),

 validarCampos
],
pacientesController.crearPaciente
);

//PUT modificar paciente
router.put(
  "/:id_paciente",
  [
    param("id_paciente", "El ID debe ser un número entero").isInt(),

    check("id_obra_social")
      .isInt()
      .withMessage("El id_obra_social debe ser un número entero."),

    validarCampos
  ],
  pacientesController.actualizarPaciente
);

//DELETE paciente
router.delete(
 "/:id_paciente",
 [
 param("id_paciente", "El ID debe ser un número entero").isInt(),
 validarCampos
 ],
 pacientesController.eliminarPaciente
);

export default router;


