import { Router } from 'express';
import { check } from "express-validator";
import { changePasswordController } from '../../controllers/ChangePasswordControlador.js'; 
import { validarCampos } from '../../middlewares/validarCampos.js';

 
    const router = Router();
    const controller = new changePasswordController();
    console.log("Setting up change password routes");
    // Define las rutas para el cambio de password, valida si viene un email valido
    router.post('/forgot',[check("email")
                .notEmpty().withMessage("El email es obligatorio.")
                .isEmail().withMessage("Debe ingresar un email válido."),validarCampos], (req,res) => controller.forgotPassword(req,res));
    router.post('/reset', (req,res) => controller.resetPassword(req,res));
export default router
