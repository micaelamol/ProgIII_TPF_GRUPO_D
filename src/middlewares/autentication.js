import jwt from "jsonwebtoken";


export function autentication (req,res,next) {
 req.user = {id_usuario: "", usuario: "", rol: ""};
 try{
  const token = req.cookies["acces-token"];
  //console.log("Token recibido en el middleware de autenticación: ", token);
  if (token) {
    //console.log("Verificando el token JWT... ", token);
    const datos = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Datos decodificados del token JWT: ", datos);
    req.user = {id_usuario: datos.payload.id_usuario, usuario: datos.payload.usuario, rol: datos.payload.rol};
    
  }
 }catch(error){
  if(error.name === "JsonWebTokenError"){
    return res.status(401).send("Token inválido");
  };
  if(error.name === "TokenExpiredError"){
    return res.status(401).send("Token expirado");
  }
  
  return res.status(500).send("Error en la verificacion del token",error.message);
 }
  next();
};