import express from "express";

import { LoginController } from "../../controllers/loginController.js";
const router = express.Router();

router.post("/login/", async (req,res) => await LoginController.login(req,res));

  

router.post('/logout/', (req, res) => {
  res.clearCookie("acces-token").status(200).json({ success: true, message: "Logout exitoso" });
});


export default router;