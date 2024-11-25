import express from "express";
import cors from 'cors';
import morgan from "morgan";
import jwt from 'jsonwebtoken'

//ROUTES
import serviciosRoutes from './routes/servicios.routes.js';
import * as seguridad from './middlewares/seguridadToken.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const app = express();

// const newToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*16),owner: 'Bonk2023'}, process.env.CLAVE);
// console.log(newToken);

//MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// app.use(seguridad.autenticarToken);

//ROUTES
app.use(serviciosRoutes);

//SERVIDOR WEB
app.listen(process.env.PORT,()=> console.log(`Corriendo en el puerto ${process.env.PORT}`))