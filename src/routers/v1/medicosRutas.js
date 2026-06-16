import { Router } from "express";
import { check, param } from "express-validator";
import { medicosController } from "../../controllers/medicosControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";

const router = Router();

/**
 * @openapi
 * /api/v1/medicos:
 *   get:
 *     summary: Obtener todos los médicos
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get("/",autorizarUsuarios([2,3]), medicosController.obtenerMedicos);

/**
 * @openapi
 * /api/v1/medicos/{id_medico}:
 *   get:
 *     summary: Obtener médico por ID
 *     tags:
 *       - Medicos
 *     parameters:
 *       - name: id_medico
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico no encontrado
 */
router.get(
  "/:id_medico",autorizarUsuarios([2,3]),
  [
    param("id_medico", "El ID debe ser un número entero").isInt(),
    validarCampos,
  ],
  medicosController.obtenerMedicoPorId
);

//esquemas de swagger para la creación y actualización de médicos, con validaciones de campos y respuestas documentadas
/**
 * @openapi
 * components:
 *   schemas:
 *     MedicoCreate:
 *       type: object
 *       required:
 *         - id_usuario
 *         - id_especialidad
 *         - matricula
 *         - valor_consulta
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario relacionado
 *           example: 1
 *         id_especialidad:
 *           type: integer
 *           description: ID de la especialidad médica
 *           example: 3
 *         matricula:
 *           type: integer
 *           description: Número de matrícula profesional
 *           example: 12345
 *         descripcion:
 *           type: string
 *           description: Descripción o presentación del médico
 *           example: "Médico especialista en cardiología con 10 años de experiencia"
 *         valor_consulta:
 *           type: number
 *           format: float
 *           description: Valor de la consulta médica
 *           example: 25000.00
 *     
 *     MedicoUpdate:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario relacionado
 *           example: 1
 *         id_especialidad:
 *           type: integer
 *           description: ID de la especialidad médica
 *           example: 3
 *         matricula:
 *           type: integer
 *           description: Número de matrícula profesional
 *           example: 12345
 *         descripcion:
 *           type: string
 *           description: Descripción o presentación del médico
 *           example: "Médico especialista en cardiología con 10 años de experiencia"
 *         valor_consulta:
 *           type: number
 *           format: float
 *           description: Valor de la consulta médica
 *           example: 25000.00
 *         activo:
 *           type: integer
 *           description: Estado del médico (1 = activo, 0 = inactivo)
 *           example: 1
 *           enum: [0, 1]
 *     
 *     MedicoResponse:
 *       type: object
 *       properties:
 *         id_medico:
 *           type: integer
 *           example: 1
 *         id_usuario:
 *           type: integer
 *           example: 1
 *         id_especialidad:
 *           type: integer
 *           example: 3
 *         matricula:
 *           type: integer
 *           example: 12345
 *         descripcion:
 *           type: string
 *           example: "Médico especialista en cardiología"
 *         valor_consulta:
 *           type: number
 *           example: 25000.00
 *         activo:
 *           type: integer
 *           example: 1
 *         
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

//swagger para el post de creación de médico, con validaciones de campos y respuestas documentadas

/**
 * @openapi
 * /api/v1/medicos:
 *   post:
 *     summary: Crear un nuevo médico
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicoCreate'
 *     responses:
 *       201:
 *         description: Médico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 medico:
 *                   $ref: '#/components/schemas/MedicoResponse'
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Medico creado con éxito!"
 *       400:
 *         description: Datos inválidos o faltantes
 *       401:
 *         description: No autorizado
 */

router.post(
  "/",autorizarUsuarios([3]),
  [
    check("id_usuario", "El ID de usuario es obligatorio y numérico.")
      .notEmpty()
      .isInt(),
    check("id_especialidad", "El ID de especialidad es obligatorio y numérico.")
      .notEmpty()
      .isInt(),
    check("descripcion", "Máximo 255 caracteres.")
      .optional()
      .isLength({ max: 255 }),
    check("matricula", "La matrícula es obligatoria.").notEmpty(),
    check("valor_consulta", "El valor de la consulta debe ser numérico.")
      .notEmpty()
      .isFloat(),
    validarCampos,
  ],
  medicosController.crearMedico
);

/**
 * @openapi
 * /api/v1/medicos/{id_medico}:
 *   put:
 *     summary: Actualizar médico por ID
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_medico
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicoUpdate'
 *     responses:
 *       200:
 *         description: Médico actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 medico:
 *                   $ref: '#/components/schemas/MedicoResponse'
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Medico con id 1 actualizado con exito!"
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Médico no encontrado
 */

router.put(
  "/:id_medico",autorizarUsuarios([3]),
  [
    param("id_medico", "El ID del médico debe ser un entero numérico").isInt(),
    check("id_usuario", "El ID de usuario es obligatorio y numérico.")
      .notEmpty()
      .isInt(),
    check("id_especialidad", "El ID de especialidad es obligatorio y numérico.")
      .notEmpty()
      .isInt(),
    check("descripcion")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Máximo 255 caracteres."),
    check("matricula", "La matrícula es obligatoria.").notEmpty(),
    check("valor_consulta", "El valor de la consulta debe ser numérico.")
      .notEmpty()
      .isFloat(),
    check("activo", "Debe ser 0 o 1.").optional().isInt({ min: 0, max: 1 }),
    validarCampos,
  ],
  medicosController.actualizarMedico
);

/**
 * @openapi
 * /api/v1/medicos/{id_medico}:
 *   delete:
 *     summary: Eliminar médico por ID (soft delete)
 *     tags:
 *       - Medicos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_medico
 *         in: path
 *         required: true
 *         description: ID del médico a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Médico eliminado exitosamente (soft delete)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 medico:
 *                   $ref: '#/components/schemas/MedicoResponse'
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "Medico con id 1 eliminado con exito!"
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete(
  "/:id_medico",autorizarUsuarios([3]),
  [
    param("id_medico", "El ID del médico debe ser un entero numérico").isInt(),
    validarCampos,
  ],
  medicosController.eliminarMedico
);

export default router;