import { Router } from "express";
import { check, param } from "express-validator";
import { EspecialidadesController } from "../controllers/especialidades.controller.js";
import { validarCampos } from "../middlewares/errorHandler.js";

const router = Router();

// GET — todas las especialidades
router.get("/", EspecialidadesController.obtenerEspecialidades);

// GET — una especialidad por ID
router.get(
    "/:id_especialidad",
    [
        param("id_especialidad", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    EspecialidadesController.obtenerEspecialidades
);

// POST — crear especialidad
router.post(
    "/",
    [
        check("nombre")
            .notEmpty().withMessage("El nombre es obligatorio.")
            .isLength({ max: 120 }).withMessage("Máximo 120 caracteres."),
        validarCampos
    ],
    EspecialidadesController.crearEspecialidad
);

// PUT — modificar especialidad
router.put(
    "/:id_especialidad",
    [
        param("id_especialidad", "El ID debe ser un número entero").isInt(),
        check("nombre")
            .notEmpty().withMessage("El nombre es obligatorio.")
            .isLength({ max: 120 }).withMessage("Máximo 120 caracteres."),
        validarCampos
    ],
    EspecialidadesController.actualizarEspecialidad
);

// DELETE — eliminar especialidad
router.delete(
    "/:id_especialidad",
    [
        param("id_especialidad", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    EspecialidadesController.eliminarEspecialidad
);

export default router;