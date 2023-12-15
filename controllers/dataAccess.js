// import postgres from 'pg';
import sql from 'mssql'
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = {
  user: process.env.USR,
  password: process.env.PWD,
  server: process.env.HOST,
  database: process.env.DB,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: false
  }
};
 
export const obtenerDatos = async (consulta) =>{
  console.log('la consulta',consulta);
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await sql.connect(config);
      const data = await pool.request().query(consulta);
      console.log('el result',data);
      resolve(data.recordset);
    } catch (error) {
      reject(error)
    }
  })
}