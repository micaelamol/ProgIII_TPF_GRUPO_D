import express from "express";

import { LoginController } from "../../controllers/loginController.js";
const router = express.Router();





router.post("/login", async (req,res) => await LoginController.login(req,res));




router.post('/logout', async (req, res) => await LoginController.logout(req, res));

export default router;