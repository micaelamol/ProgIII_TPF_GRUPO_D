import { Router } from "express";
import { check, param } from "express-validator";
import { ObrasSocialesController } from "../../controllers/obrasSocialesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

// GET de todas las obras sociales
router.get(
    "/",
    ObrasSocialesController.obtenerObrasSociales
);

// GET — una obra social por ID
router.get(
    "/:id_obra_social",
    [
        param("id_obra_social", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    ObrasSocialesController.obtenerObraSocialPorId
);

// POST para crear obra social
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
        validarCampos
    ],
    ObrasSocialesController.crearObraSocial
);

// PUT — modificar obra social
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
        validarCampos
    ],
    ObrasSocialesController.actualizarObraSocial
);

// DELETE — eliminar obra social
router.delete(
    "/:id_obra_social",
    [
        param("id_obra_social", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    ObrasSocialesController.eliminarObraSocial
);

export default router;
