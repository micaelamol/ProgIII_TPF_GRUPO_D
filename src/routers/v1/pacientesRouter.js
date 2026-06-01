import { Router } from "express";
import { check, param } from "express-validator";
import { PacientesController } from "../../controllers/pacientesController.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

router.get("/", PacientesController.obtenerPacientes);

router.get(
    "/:id_paciente",
    [
        param("id_paciente", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    PacientesController.obtenerPacientePorId
);

router.post(
    "/",
    [
        check("id_usuario")
            .isInt()
            .withMessage("El id_usuario debe ser un número entero."),

        check("id_obra_social")
            .isInt()
            .withMessage("El id_obra_social debe ser un número entero."),

        validarCampos
    ],
    PacientesController.crearPaciente
);

router.put(
    "/:id_paciente",
    [
        param("id_paciente", "El ID debe ser un número entero").isInt(),

        check("id_usuario")
            .isInt()
            .withMessage("El id_usuario debe ser un número entero."),

        check("id_obra_social")
            .isInt()
            .withMessage("El id_obra_social debe ser un número entero."),

        validarCampos
    ],
    PacientesController.actualizarPaciente
);

router.delete(
    "/:id_paciente",
    [
        param("id_paciente", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    PacientesController.eliminarPaciente
);

export default router;