import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import TurnosReservasControlador from '../../controllers/turnosReservasControlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const turnosReservasControlador = new TurnosReservasControlador();

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   post:
 *     summary: Crear un turno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico:
 *                 type: integer
 *               id_paciente:
 *                 type: integer
 *               fecha_hora:
 *                 type: string
 *                 example: "2026-06-15 10:00:00"
 *     responses:
 *       201:
 *         description: Turno creado
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Sin permisos
 */
// Agregar autenticaciones aca segun el rol
router.post('/', autorizarUsuarios([2, 3]),
    [
        check('id_medico')
            .notEmpty().withMessage('El id_medico es obligatorio')
            .isInt().withMessage('El id_medico debe ser un número entero'),
        check('id_paciente')
            .notEmpty().withMessage('El id_paciente es obligatorio')
            .isInt().withMessage('El id_paciente debe ser un número entero'),
        check('fecha_hora')
            .notEmpty().withMessage('La fecha_hora es obligatoria'),
        validarCampos
    ],
    turnosReservasControlador.crear);

/**
* @swagger
* /api/v1/turnos-reservas/estadisticas:
*   get:
*     summary: Obtener estadísticas de turnos
*     description: Solo admin (3). Ejecuta un stored procedure.
*     responses:
*       200:
*         description: Estadísticas obtenidas
*       403:
*         description: Sin permisos
*/

router.get('/estadisticas', autorizarUsuarios([3]), turnosReservasControlador.obtenerEstadisticas);

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   get:
 *     summary: Listar turnos del usuario logueado
 *     description: Médico ve sus turnos, paciente los suyos, admin ve todos
 *     responses:
 *       200:
 *         description: Lista de turnos
 *       403:
 *         description: Sin permisos
 */

router.get('/', autorizarUsuarios([1, 2, 3]), turnosReservasControlador.buscarTodos);

/**
 * @swagger
 * /api/v1/turnos-reservas/{id}:
 *   patch:
 *     summary: Marcar un turno como atendido
 *     description: Solo médico (1)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Turno marcado como atendido
 *       404:
 *         description: Turno no encontrado
 *       403:
 *         description: Sin permisos
 */

router.patch('/:id', autorizarUsuarios([1]), [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    validarCampos
], turnosReservasControlador.marcarAtendido);


/**
 * @swagger
 * /api/v1/turnos-reservas/{id}:
 *   delete:
 *     summary: Eliminar un turno (soft delete)
 *     description: Solo admin (3)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Turno eliminado correctamente
 *       404:
 *         description: Turno no encontrado
 *       403:
 *         description: Sin permisos
 */

router.delete('/:id', autorizarUsuarios([3]), [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    validarCampos
], turnosReservasControlador.eliminarTurno);


export default router;