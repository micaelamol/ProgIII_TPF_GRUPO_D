import { Router } from "express";
import { check, param } from "express-validator";
import { EspecialidadesController } from "../../controllers/especialidadesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";

const router = Router();

/**
 * @swagger
 * /api/v1/especialidades:
 *   get:
 *     summary: Obtener todas las especialidades
 *     responses:
 *       200:
 *         description: Lista de especialidades
 */

// GET de todas las especialidades
router.get(
    "/",autorizarUsuarios([1,2,3]),
    EspecialidadesController.obtenerEspecialidades
);

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   get:
 *     summary: Obtener una especialidad por ID
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 *       404:
 *         description: No encontrada
 */

// GET — una especialidad por ID
router.get(
    "/:id_especialidad",autorizarUsuarios([1,2,3]),
    [
        param("id_especialidad", "El ID debe ser un número entero").isInt(),
        validarCampos
    ],
    EspecialidadesController.obtenerEspecialidadPorId
);

/**
 * @swagger
 * /api/v1/especialidades:
 *   post:
 *     summary: Crear una nueva especialidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiología
 *     responses:
 *       201:
 *         description: Especialidad creada exitosamente
 */

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

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   put:
 *     summary: Actualizar una especialidad por ID
 *     parameters:
 *       - in: path
 *         name: id_especialidad
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
 *                 example: Cardiología Avanzada
 *     responses:
 *       200:
 *         description: Especialidad actualizada exitosamente
 *       404:
 *         description: Especialidad no encontrada
 */

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

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   delete:
 *     summary: Eliminar una especialidad por ID
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad eliminada exitosamente
 *       404:
 *         description: Especialidad no encontrada
 */

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