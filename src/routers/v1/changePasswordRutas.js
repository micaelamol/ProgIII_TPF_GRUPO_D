import { Router } from 'express';
import { check } from "express-validator";
import { changePasswordController } from '../../controllers/ChangePasswordControlador.js'; 
import { validarCampos } from '../../middlewares/validarCampos.js';

/**
 * @swagger
 * tags:
 *   name: Renovar la contraseña
 *   description: Endpoints para renovar la contraseña
 */
 

const router = Router();
const controller = new changePasswordController();
//console.log("Setting up change password routes");
// Define las rutas para el cambio de password, valida si viene un email valido

/**
 * @swagger
 * /api/v1/password/forgot:
 *   post:
 *     summary: Solicitar cambio de contraseña
 *     description: Devuelve un token para cambiar la contraseña. El que sera utilizado en la ruta reset
 *     tags: [Renovar la contraseña]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@correo.com"
 *     responses:
 *       201:
 *         description: Token de cambio de contraseña enviado en esta respuesta.
 *       400:
 *         description: Solicitud inválida.
 *       404:
 *         description: Email no encontrado.
 */

    router.post('/forgot',[check("email")
                .notEmpty().withMessage("El email es obligatorio.")
                .isEmail().withMessage("Debe ingresar un email válido."),validarCampos], (req,res) => controller.forgotPassword(req,res));

/**
 * @swagger
 * /api/v1/password/reset:
 *  post:
 *    summary: Restablecer contraseña
 *    description: Restablece la contraseña utilizando un token válido.
 *    tags: [Renovar la contraseña]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJlbWFpbCI6InVzZXJAY29ycmVvLmNvbSIsImZlY2hhIjoiMjAyMy0wNS0yOFQxMjozMzo1OS4yODNaIiwiaWF0IjoxNjg1MDk5ODgzLCJleHAiOjE2ODUxMDg1ODN9.7n8sKj8mLhXoHqj3e7u9a8b6c5d4e3f2g1h0i9j8k7l6m5n4o3p2q1r0s9t8u7v6w5x4y3z2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w9x8y7z6a5b4c3d2e1f0g9h8i7j6k5l4m3n2o1p0q9r8s7t6u5v4w3x2y1z0a9b8c7d6e5f4g3h2i1j0k9l8m7n6o5p4q3r2s1t0u9v8w7x6y5z4a3b2c1d0e9f8g7h6i5j4k3l2m1n"
 *              newPassword:
 *                type: string
 *                example: "NuevaContraseña123"
 *    responses:
 *      201:
 *        description: Contraseña restablecida con éxito.
 *      400:
 *        description: Token inválido o expirado.
 *      404:
 *        description: Usuario no encontrado.
 *      500:
 *        description: Error procesando el reset de la contraseña.
 */
    router.post('/reset', (req,res) => controller.resetPassword(req,res));
export default router
