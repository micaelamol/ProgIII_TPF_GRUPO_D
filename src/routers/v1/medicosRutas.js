import { Router } from "express";
import { check, param } from "express-validator";
import { medicosController } from "../../controllers/medicosControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

/**
 * @openapi
 * /medicos:
 *   get:
 *     summary: Obtener todos los médicos
 *     tags:
 *       - Medicos
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get("/", medicosController.obtenerMedicos);

/**
 * @openapi
 * /medicos/{id_medico}:
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
  "/:id_medico",
  [
    param("id_medico", "El ID debe ser un número entero").isInt(),
    validarCampos,
  ],
  medicosController.obtenerMedicoPorId
);

/**
 * @openapi
 * /medicos:
 *   post:
 *     summary: Crear un nuevo médico
 *     tags:
 *       - Medicos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medico'
 *     responses:
 *       201:
 *         description: Médico creado exitosamente
 */
router.post(
  "/",
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
 * /medicos/{id_medico}:
 *   put:
 *     summary: Actualizar médico por ID
 *     tags:
 *       - Medicos
 *     parameters:
 *       - name: id_medico
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medico'
 *     responses:
 *       200:
 *         description: Médico actualizado
 *       404:
 *         description: Médico no encontrado
 */
router.put(
  "/:id_medico",
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
 * /medicos/{id_medico}:
 *   delete:
 *     summary: Eliminar médico por ID
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
 *         description: Médico eliminado
 *       404:
 *         description: Médico no encontrado
 */
router.delete(
  "/:id_medico",
  [
    param("id_medico", "El ID del médico debe ser un entero numérico").isInt(),
    validarCampos,
  ],
  medicosController.eliminarMedico
);

export default router;