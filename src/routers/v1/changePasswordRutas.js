import { Router } from 'express';
import { changePasswordController } from '../../controllers/ChangePasswordControlador.js'; 

 
    const router = Router();
    const controller = new changePasswordController();
    console.log("Setting up change password routes");
    // Define password change routes here
    router.post('/forgot', (req,res) => controller.forgotPassword(req,res));
    
export default router
