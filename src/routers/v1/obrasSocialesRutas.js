import { Router } from "express";
import { check, param } from "express-validator";
import { ObrasSocialesController } from "../../controllers/obrasSocialesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ObrasSociales
 *   description: Endpoints para gestionar obras sociales
 */

/**
 * @swagger
 * /api/v1/obras_sociales:
 *   get:
 *     summary: Obtener todas las obras sociales
 *     tags: [ObrasSociales]
 *     responses:
 *       200:
 *         description: Lista de obras sociales
 */
router.get("/", ObrasSocialesController.obtenerObrasSociales);

/**
 * @swagger
 * /api/v1/obras_sociales/{id_obra_social}:
 *   get:
 *     summary: Obtener una obra social por ID
 *     tags: [ObrasSociales]
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social encontrada
 *       404:
 *         description: No encontrada
 */
router.get(
  "/:id_obra_social",
  [
    param("id_obra_social", "El ID debe ser un número entero").isInt(),
    validarCampos,
  ],
  ObrasSocialesController.obtenerObraSocialPorId
);

/**
 * @swagger
 * /api/v1/obras_sociales:
 *   post:
 *     summary: Crear una nueva obra social
 *     tags: [ObrasSociales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: OSDE
 *               descripcion:
 *                 type: string
 *                 example: Obra social privada
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 20
 *               es_particular:
 *                 type: integer
 *                 enum: [0,1]
 *                 example: 0
 *               activo:
 *                 type: integer
 *                 enum: [0,1]
 *                 example: 1
 *     responses:
 *       201:
 *         description: Obra social creada
 */
router.post(
  "/",
  [
    check("nombre")
      .notEmpty().withMessage("El nombre es obligatorio.")
      .isLength({ max: 120 }).withMessage("Máximo 120 caracteres."),
    check("descripcion")
      .optional()
      .isLength({ max: 255 }).withMessage("Máximo 255 caracteres."),
    check("porcentaje_descuento")
      .notEmpty().withMessage("El porcentaje de descuento es obligatorio.")
      .isNumeric().withMessage("Debe ser un número."),
    check("es_particular")
      .notEmpty().withMessage("El campo 'es_particular' es obligatorio.")
      .isInt({ min: 0, max: 1 }).withMessage("Debe ser 0 o 1."),
    check("activo")
      .notEmpty().withMessage("El campo 'activo' es obligatorio.")
      .isInt({ min: 0, max: 1 }).withMessage("Debe ser 0 o 1."),
    validarCampos,
  ],
  ObrasSocialesController.crearObraSocial
);

/**
 * @swagger
 * /api/v1/obras_sociales/{id_obra_social}:
 *   put:
 *     summary: Actualizar una obra social
 *     tags: [ObrasSociales]
 *     parameters:
 *       - in: path
 *         name: id_obra_social
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               porcentaje_descuento:
 *                 type: number
 *               es_particular:
 *                 type: integer
 *                 enum: [0,1]
 *               activo:
 *                 type: integer
 *                 enum: [0,1]
 *     responses:
 *       200:
 *         description: Obra social actualizada
 */
router.put(
  "/:id_obra_social",
  [
    param("id_obra_social", "El ID debe ser un número entero").isInt(),
    check("nombre")
      .notEmpty().withMessage("El nombre es obligatorio.")
      .isLength({ max: 120 }).withMessage("Máximo 120 caracteres."),
    check("descripcion")
      .optional()
      .isString().withMessage("La descripción debe ser un texto.")
      .isLength({ max: 255 }).withMessage("Máximo 255 caracteres."),
    check("porcentaje_descuento")
      .notEmpty().withMessage("El porcentaje de descuento es obligatorio.")
      .isNumeric().withMessage("Debe ser un número."),
    check("es_particular")
      .notEmpty().withMessage("El campo 'es_particular' es obligatorio.")
      .isInt({ min: 0, max: 1 }).withMessage("Debe ser 0 o 1."),
    check("activo")
      .notEmpty().withMessage("El campo 'activo' es obligatorio.")
      .isInt({ min: 0, max: 1 }).withMessage("Debe ser 0 o 1."),
    validarCampos,
  ],
  ObrasSocialesController.actualizarObraSocial
);

/**
 * @swagger
 * /api/v1/obras_sociales/{id_obra_social}:
 *   delete:
 *     summary: Eliminar una obra social
 *     tags: [ObrasSociales]
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social eliminada
 */
router.delete(
  "/:id_obra_social",
  [
    param("id_obra_social", "El ID debe ser un número entero").isInt(),
    validarCampos,
  ],
  ObrasSocialesController.eliminarObraSocial
);

export default router;