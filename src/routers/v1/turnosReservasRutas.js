import express  from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

import TransformarDTO from '../../middlewares/dtoMiddleware.js';
import TurnosReservasControlador from '../../controllers/turnosReservasControlador.js';

const router = express.Router();

const turnosReservasControlador = new TurnosReservasControlador();
const transformarDTO = new TransformarDTO();

router.post('/', 
    [
        check('id_medico')
            .notEmpty().withMessage('El id_medico es obligatorio.'),
        check('id_paciente')
            .notEmpty().withMessage('El id_paciente es obligatoria.'),
        check('fecha_hora')
            .notEmpty().withMessage('La fecha_hora es obligatorio.'),
        validarCampos
    ], 
    transformarDTO.turnosReservasCrearDTO,
    turnosReservasControlador.crear);


export default router;