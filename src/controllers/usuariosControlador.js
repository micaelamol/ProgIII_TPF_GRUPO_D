import UsuariosServicio from "../services/usuariosServicio.js";

// GET todos
const obtenerUsuarios = async (req, res) => {
    try {
        const listado = await UsuariosServicio.obtenerUsuarios();

        res.status(200).json({
            listado,
            estado: true,
            msg: "Usuarios obtenidos con éxito!"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

// GET por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const usuario = await UsuariosServicio.obtenerUsuarioPorId(id_usuario);
        delete usuario.contrasenia;
        res.status(200).json({
            usuario,
            estado: true,
            msg: "Usuario obtenido con éxito!"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

// POST
const crearUsuario = async (req, res) => {
    try {
        const usuario = await UsuariosServicio.crearUsuario(req.body);

        res.status(201).json({
            usuario,
            estado: true,
            msg: "Usuario creado con éxito!"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

// PUT
const actualizarUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const usuarioActualizado =
            await UsuariosServicio.actualizarUsuario(
                id_usuario,
                req.body
            );

        res.status(200).json({
            usuario: usuarioActualizado,
            estado: true,
            msg: `Usuario con id ${id_usuario} actualizado con éxito!`
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

// DELETE (soft delete)
const eliminarUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const usuarioEliminado =
            await UsuariosServicio.eliminarUsuario(id_usuario);

        res.status(200).json({
            usuario: usuarioEliminado,
            estado: true,
            msg: "Usuario eliminado con éxito!"
        });
    } catch (error) {
        res.status(error.status || 500).json({
            estado: false,
            msg: error.message
        });
    }
};

export const UsuariosController = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};