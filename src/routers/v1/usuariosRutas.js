import { Router } from "express";
import { check, param } from "express-validator";
import { UsuariosController } from "../../controllers/usuariosControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import upload from "../../config/multer.js";  // agregado: middleware para subir archivos
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

// GET de todos los usuarios
router.get("/", UsuariosController.obtenerUsuarios);

// GET — usuario por ID
router.get(
  "/:id_usuario",
  [
    param("id_usuario", "El ID debe ser un número entero").isInt(),
    validarCampos,
  ],
  UsuariosController.obtenerUsuarioPorId
);

// POST — crear usuario
router.post(
  "/",
  upload, //  agregado: procesa el archivo  del formulario
  [
    check("documento")
      .notEmpty().withMessage("El documento es obligatorio.")
      .isLength({ max: 20 }).withMessage("Máximo 20 caracteres."),
    check("apellido")
      .notEmpty().withMessage("El apellido es obligatorio.")
      .isLength({ max: 100 }).withMessage("Máximo 100 caracteres."),
    check("nombres")
      .notEmpty().withMessage("Los nombres son obligatorios.")
      .isLength({ max: 100 }),
    check("email")
      .notEmpty().withMessage("El email es obligatorio.")
      .isEmail().withMessage("Debe ingresar un email válido."),
    check("contrasenia")
      .notEmpty().withMessage("La contraseña es obligatoria.")
      .isLength({ min: 6, max: 255 })
      .withMessage("Debe tener entre 6 y 255 caracteres."),
    check("rol")
      .notEmpty().withMessage("El rol es obligatorio.")
      .isInt().withMessage("El rol debe ser un número entero."),
    check("activo")
      .notEmpty().withMessage("El estado activo es obligatorio.")
      .isInt({ min: 0, max: 1 })
      .withMessage("Activo debe ser 0 o 1."),
    validarCampos,
  ],
  async (req, res) => {
    try {
      // agregado: mapear la foto subida a foto_path
      if (req.file) {
        req.body.foto_path = req.file.filename;
      }
      await UsuariosController.crearUsuario(req, res);
    } catch (error) {
      res.status(400).json({
        estado: false,
        msg: "Error al crear usuario",
        error: error.message,
      });
    }
  }
);

// PUT — modificar usuario
// PUT — modificar usuario
router.put(
  "/:id_usuario",
  upload,
  [
    param("id_usuario", "El ID debe ser un número entero").isInt(),

    check("documento")
      .notEmpty()
      .withMessage("El documento es obligatorio.")
      .isLength({ max: 20 }),

    check("apellido")
      .notEmpty()
      .withMessage("El apellido es obligatorio.")
      .isLength({ max: 100 }),

    check("nombres")
      .notEmpty()
      .withMessage("Los nombres son obligatorios.")
      .isLength({ max: 100 }),

    validarCampos,
  ],
  async (req, res) => {
    try {

      if (req.file) {
        req.body.foto_path = req.file.filename;
      }

      await UsuariosController.actualizarUsuario(req, res);

    } catch (error) {
      res.status(400).json({
        estado: false,
        msg: "Error al actualizar usuario",
        error: error.message
      });
    }
  }
);

// DELETE — eliminar usuario
router.delete(
  "/:id_usuario",
  [
    param("id_usuario", "El ID debe ser un número entero").isInt(),
    validarCampos,
  ],
  UsuariosController.eliminarUsuario
);

// POST — login de usuario
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, usuario, info) => {
    if (err || !usuario) {
      return res
        .status(400)
        .json({ estado: false, mensaje: "Login incorrecto", info });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario },
      process.env.SECRET_KEY, //  
      { expiresIn: "1h" }
    );

    return res.json({ estado: true, mensaje: "Login correcto", token });
  })(req, res, next);
});

// GET — perfil protegido con JWT
router.get(
  "/perfil",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      estado: true,
      mensaje: "Acceso a perfil",
      usuario: req.user,
    });
  }
);

export default router;