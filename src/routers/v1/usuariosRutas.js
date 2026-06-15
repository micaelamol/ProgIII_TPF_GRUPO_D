import { Router } from "express";
import { check, param } from "express-validator";
import { UsuariosController } from "../../controllers/usuariosControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

// GET de todos los usuarios
router.get(
    "/",
    UsuariosController.obtenerUsuarios
);

// GET — usuario por ID
router.get(
    "/:id_usuario",
    [
        param("id_usuario", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    UsuariosController.obtenerUsuarioPorId
);

// POST — crear usuario
router.post(
    "/",
    [
        check("documento")
            .notEmpty().withMessage("El documento es obligatorio.")
            .isLength({ max: 20 }).withMessage("Máximo 20 caracteres."),

        check("apellido")
            .notEmpty().withMessage("El apellido es obligatorio.")
            .isLength({ max: 100 }).withMessage("Máximo 100 caracteres."),

        check("nombres")
            .notEmpty().withMessage("Los nombres son obligatorios.")
            .isLength({ max: 100 }).withMessage("Máximo 100 caracteres."),

        check("email")
            .notEmpty().withMessage("El email es obligatorio.")
            .isEmail().withMessage("Debe ingresar un email válido."),

        check("contrasenia")
            .notEmpty().withMessage("La contraseña es obligatoria.")
            .isLength({ min: 6, max: 255 })
            .withMessage("Debe tener entre 6 y 255 caracteres."),

        check("foto_path")
            .optional()
            .isLength({ max: 255 })
            .withMessage("Máximo 255 caracteres."),

        check("rol")
            .notEmpty().withMessage("El rol es obligatorio.")
            .isInt().withMessage("El rol debe ser un número entero."),

        check("activo")
            .notEmpty().withMessage("El estado activo es obligatorio.")
            .isInt({ min: 0, max: 1 })
            .withMessage("Activo debe ser 0 o 1."),

        validarCampos
    ],
    UsuariosController.crearUsuario
);

// PUT — modificar usuario
router.put(
    "/:id_usuario",
    [
        param("id_usuario", "El ID debe ser un número entero").isInt(),

        //check("documento")
         //   .optional(),
           //.notEmpty().withMessage("El documento es obligatorio.")
           // .isLength({ max: 20 }),
           

        check("apellido")
            .notEmpty().withMessage("El apellido es obligatorio.")
            .isLength({ max: 100 }),

        check("nombres")
            .notEmpty().withMessage("Los nombres son obligatorios.")
            .isLength({ max: 100 }),

        check("email")
            .notEmpty().isEmail()
            .withMessage("Debe ingresar un email válido."),

        check("contrasenia")
            .optional()
            .isLength({ min: 6, max: 255 }),

        check("foto_path")
            .optional()
            .isLength({ max: 255 }),

        check("rol")
            .isInt()
            .withMessage("El rol debe ser un número entero."),

        check("activo")
            .isInt({ min: 0, max: 1 })
            .withMessage("Activo debe ser 0 o 1."),

        validarCampos
    ],
    UsuariosController.actualizarUsuario
);

// DELETE — eliminar usuario
router.delete(
    "/:id_usuario",
    [
        param("id_usuario", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    UsuariosController.eliminarUsuario
);

export default router;