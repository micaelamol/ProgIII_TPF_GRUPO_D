import express from "express";

import { LoginController } from "../../controllers/loginController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica al usuario y devuelve un token JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@ejemplo.com
 *               contrasenia:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Credenciales inválidas
 */



router.post("/login", async (req,res) => await LoginController.login(req,res));

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Elimina la cookie de acceso y cierra la sesión del usuario.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout exitoso
 */



router.post('/logout', async (req, res) => await LoginController.logout(req, res));

export default router;