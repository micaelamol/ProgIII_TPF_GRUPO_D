import { Router } from "express";
import { check, param } from "express-validator";
import { medicosController } from "../../controllers/medicosControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

// ------ GET --------
router.get(
    "/",
    medicosController.obtenerMedicos
);

// ------ GET Medico por ID ----------
router.get(
    "/:id_medico",
    [
        param("id_medico", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    medicosController.obtenerMedicoPorId
);

// ---------- POST crear medico -------------
router.post("/", [
    check("id_usuario", "El ID de usuario es obligatorio y numérico.").notEmpty().isInt(),
    check("id_especialidad", "El ID de especialidad es obligatorio y numérico.").notEmpty().isInt(),
    check("descripcion","Máximo 255 caracteres.").optional().isLength({ max: 255 }),
    check("matricula", "La matrícula es obligatoria.").notEmpty(),
    check("valor_consulta", "El valor de la consulta debe ser numérico.").notEmpty().isFloat(),
    validarCampos
], medicosController.crearMedico);

// ------- PUT modificar medico -------
router.put("/:id_medico", [
    param("id_medico", "El ID del médico debe ser un entero numérico").isInt(),

    check("id_usuario", "El ID de usuario es obligatorio y numérico.").notEmpty().isInt(),
    check("id_especialidad", "El ID de especialidad es obligatorio y numérico.").notEmpty().isInt(),
    check("descripcion").optional().isLength({ max: 255 }).withMessage("Máximo 255 caracteres."),
    check("matricula", "La matrícula es obligatoria.").notEmpty(),
    check("valor_consulta", "El valor de la consulta debe ser numérico.").notEmpty().isFloat(),
    check("activo", "Debe ser 0 o 1.").optional().isInt({ min: 0, max: 1 }),
    validarCampos
], medicosController.actualizarMedico);

//------- DELETE medico -------
router.delete(
    "/:id_medico",
    [
        param("id_medico", "El ID del médico debe ser un entero numérico").isInt(),
        validarCampos
    ],
    medicosController.eliminarMedico
);

export default router;