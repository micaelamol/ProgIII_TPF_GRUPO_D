import { Usuarios } from "../db/usuarios.js";

export class changePasswordController {
  constructor() {
    //console.log("ChangePasswordController initialized");
  }

    async forgotPassword (req, res) {
      try{
      console.log("Forgot password endpoint hit");
      // Implement forgot password logic here
      const usuarios = await Usuarios.listarUsuarios();
      console.log("Usuarios:", usuarios);
      return res.json({ message: "Forgot password functionality not implemented yet.", usuarios });
    }catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({ message: "Error processing forgot password request." });
    }
  }
}
