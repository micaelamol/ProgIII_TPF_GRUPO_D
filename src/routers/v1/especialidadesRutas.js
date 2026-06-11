import { Router } from "express";
import { check, param } from "express-validator";
import { EspecialidadesController } from "../../controllers/especialidadesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";

const router = Router();

// GET de todas las especialidades
router.get(
    "/",autorizarUsuarios([1,2,3]),
    EspecialidadesController.obtenerEspecialidades
);

// GET — una especialidad por ID
router.get(
    "/:id_especialidad",autorizarUsuarios([1,2,3]),
    [
        param("id_especialidad", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    EspecialidadesController.obtenerEspecialidadPorId
);

// POST para crear especialidad
router.post(
    "/",
    [
        check("nombre")
            .notEmpty().withMessage("El nombre es obligatorio.")
            .isLength({ max: 120 }).withMessage("Máximo 120 caracteres."),
        validarCampos
    ],autorizarUsuarios([1,2,3]),
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