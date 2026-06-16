import { Router } from "express";
import { check, param } from "express-validator";
import { UsuariosController } from "../../controllers/usuariosControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";

const router = Router();



/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestionar usuarios
 */

/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

// GET de todos los usuarios
router.get(
    "/",autorizarUsuarios([3]),
    UsuariosController.obtenerUsuarios
);


/**
 * @swagger
 * /api/v1/usuarios/{id_usuario}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */


// GET — usuario por ID
router.get(
    "/:id_usuario", autorizarUsuarios([3]),
    [
        param("id_usuario", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    UsuariosController.obtenerUsuarioPorId
);





/**
 * @swagger
 * /api/v1/usuarios:
 *   post:
 *     summary: Crear usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documento
 *               - apellido
 *               - nombres
 *               - email
 *               - contrasenia
 *               - rol
 *             properties:
 *               documento:
 *                 type: string
 *               apellido:
 *                 type: string
 *               nombres:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               foto_path:
 *                 type: string
 *               rol:
 *                 type: integer
 *               activo:
 *                 type: integer
 *           example:
 *             documento: "31000114"
 *             apellido: "Perez"
 *             nombres: "Luis"
 *             email: "perlui@correo.com"
 *             contrasenia: "123456"
 *             foto_path: " "
 *             rol: 2
 *             activo: 1
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 
 *       
 */


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
    ],autorizarUsuarios([3]),
    UsuariosController.crearUsuario
);




/**
 * @swagger
 * /api/v1/usuarios/{id_usuario}:
 *   put:
 *     summary: Modificar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_usuario
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
 *               documento:
 *                 type: string
 *               apellido:
 *                 type: string
 *               nombres:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               foto_path:
 *                 type: string
 *               rol:
 *                 type: integer
 *               activo:
 *                 type: integer
 *           example:
 *             documento: "31000114"
 *             apellido: "Perez"
 *             nombres: "Luis"
 *             email: "perlui@correo.com"
 *             contrasenia: "hash123"
 *             foto_path: ""
 *             rol: 2
 *             activo: 1
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

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
    ], autorizarUsuarios([3]),
    UsuariosController.actualizarUsuario
);




/**
 * @swagger
 * /api/v1/usuarios/{id_usuario}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 *     description: Elimina un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *     
 */
// DELETE — eliminar usuario
router.delete(
    "/:id_usuario",
    [
        param("id_usuario", "El ID debe ser un número entero").isInt(),
        validarCampos
    ], autorizarUsuarios([3]),
    UsuariosController.eliminarUsuario
);

export default router;