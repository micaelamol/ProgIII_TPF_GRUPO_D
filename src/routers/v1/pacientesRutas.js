import { Router } from "express";
import { check, param } from "express-validator";
import { pacientesController } from "../../controllers/pacientesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Endpoints para gestionar pacientes
 */

/**
 * @swagger
 * /api/v1/pacientes:
 *   get:
 *     summary: Obtener todos los pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */


//GET
router.get(
  "/", autorizarUsuarios([1,3]), 
  pacientesController.obtenerPacientes);



/**
 * @swagger
 * /api/v1/pacientes/{id_paciente}:
 *   get:
 *     summary: Obtener un paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente no encontrado
 */

//Get paciente por ID
router.get(
 "/:id_paciente", autorizarUsuarios([1,3]),
 [
 param("id_paciente", "El ID debe ser un número entero").isInt(),
 validarCampos
 ],
 pacientesController.obtenerPacientePorId

);


/**
 * @swagger
 * /api/v1/pacientes:
 *   post:
 *     summary: Crear un paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_obra_social
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *                 description: ID del usuario asociado al paciente
 *               id_obra_social:
 *                 type: integer
 *                 example: 2
 *                 description: ID de la obra social asociada al paciente
 *     responses:
 *       201:
 *         description: Paciente creado correctamente
 *       404:
 *         description: No encontrado
 *  */

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
], autorizarUsuarios([1,3]),
pacientesController.crearPaciente
);






/**
 * @swagger
 * /api/v1/pacientes/{id_paciente}:
 *   put:
 *     summary: Modificar paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_obra_social:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Paciente actualizado correctamente
 *       404:
 *         description: Paciente no encontrado
 */


//PUT modificar paciente
router.put(
  "/:id_paciente",
  [
    param("id_paciente", "El ID debe ser un número entero").isInt(),

    check("id_obra_social")
      .isInt()
      .withMessage("El id_obra_social debe ser un número entero."),

    validarCampos
  ], autorizarUsuarios([1,3]),
  pacientesController.actualizarPaciente
);



/**
 * @swagger
 * /api/v1/pacientes/{id_paciente}:
 *   delete:
 *     summary: Eliminar un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente eliminado con éxito
 *       404:
 *         description: Paciente no encontrado
 */

//DELETE paciente
router.delete(
 "/:id_paciente",autorizarUsuarios([1,3]),
 [
 param("id_paciente", "El ID debe ser un número entero").isInt(),
 validarCampos
 ],
 pacientesController.eliminarPaciente
);

export default router;


