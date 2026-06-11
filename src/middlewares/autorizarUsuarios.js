export function autorizarUsuarios (rolesPermitidos) {

    return (req, res, next) => {
      
      
        const usuario = req.user;
        
        if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
            return res.status(403).send("Acceso denegado: no tiene permisos para acceder a este recurso");
        }
        next();
    }
}