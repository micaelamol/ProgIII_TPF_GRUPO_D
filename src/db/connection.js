import mysql from "mysql2/promise";
import path from "path";


 
process.loadEnvFile( path.resolve("./.env"));
export const connection = await mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

connection
  .getConnection()
  .then((conn) => {
    conn.release();
  })
  .catch((err) => {
    
    console.error("Error al conectar a la base de datos: connection.js", err);
    
  });
