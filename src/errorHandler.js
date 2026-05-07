
import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({
            estado: false,
            mensaje: errors.mapped()
        })
    }

    next();
}  
