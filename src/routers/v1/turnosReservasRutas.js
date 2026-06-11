import express from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

import TurnosReservasControlador from '../../controllers/turnosReservasControlador.js';

const router = express.Router();

const turnosReservasControlador = new TurnosReservasControlador();


// Agregar autenticaciones aca segun el rol
router.post('/',
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


router.get('/', turnosReservasControlador.buscarTodos);

router.patch('/:id', [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    validarCampos
], turnosReservasControlador.marcarAtendido);

router.delete('/:id', [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    validarCampos
], turnosReservasControlador.eliminarTurno);


export default router;