import * as da from './dataAccess.js'
import crypto from 'crypto'
import { config as dotenvConfig } from 'dotenv';
import jwt from 'jsonwebtoken';

dotenvConfig();

export const listarUsuarios = async (req,res) =>{
  console.log('listarUsuarios',req.query);
  try {
    const respuesta = await da.obtenerDatos('select * from Usuario');
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error listarUsuarios',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const crudUsuario = async (req,res) =>{
  console.log('crudUsuario',req.query);
  const {opcion,id,nombre,password} = req.query
  const passhash = crypto.createHash("md5").update(password).digest("hex")
  let message = 'Registro insertado satisfactoriamente!';
  if(opcion=='U') message.replace('insertado','actualizado')
  if(opcion=='D') message.replace('insertado','eliminado')
  try {
    const respuesta = await da.obtenerDatos(`exec dbo.crudUsuario '${opcion}',${id},'${nombre}','${passhash}'`);
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error crudUsuario',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const login = async (req,res) =>{
  console.log('login',req.body);
  const {user,password} = req.body
  const passhash = crypto.createHash("md5").update(password).digest("hex")
  try {
    const prevToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60*60*10),owner: 'Bonk2023'}, process.env.CLAVE)
    const respuesta = await da.obtenerDatos(`select * from Usuario where Nombre = '${user}'`);
    respuesta[0]?.Password == passhash ? res.status(200).json({message: 'Login correcto!', data: [{token:prevToken}]})
    : res.status(401).json({message: 'Usuario o contraseña incorrectos!', data: []})
  } catch (error) {
    console.log('Error listarUsuarios',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const listarEspecialidad = async (req,res) =>{
  console.log('listarEspecialidad',req.query);
  try {
    const respuesta = await da.obtenerDatos('select * from Especialidad');
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error listarEspecialidad',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const crudEspecialidad = async (req,res) =>{
  console.log('crudEspecialidad',req.query);
  const {opcion,id,descripcion} = req.query
  let message = 'Registro insertado satisfactoriamente!';
  if(opcion=='U') message.replace('insertado','actualizado')
  if(opcion=='D') message.replace('insertado','eliminado')
  try {
    const respuesta = await da.obtenerDatos(`exec dbo.crudEspecialidad '${opcion}',${id},'${descripcion}'`);
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error crudEspecialidad',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const listarDoctor = async (req,res) =>{
  //ejemplo de uso acceso a datos como API
  console.log('listarDoctores',req.query);
  try {
    const respuesta = await da.obtenerDatos('select * from Doctor');
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error listarDoctor',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const crudDoctor = async (req,res) =>{
  //ejemplo de uso acceso a datos como API
  console.log('crudDoctor',req.query);
  const {opcion,id,nombre,idEspecialidad,direccion,telefono,fechaNacimiento} = req.query
  let message = 'Registro insertado satisfactoriamente!';
  if(opcion=='U') message.replace('insertado','actualizado')
  if(opcion=='D') message.replace('insertado','eliminado')
  try {
    const respuesta = await da.obtenerDatos(`exec dbo.crudDoctor '${opcion}',${id},'${nombre}',${idEspecialidad},'${direccion}','${telefono}','${fechaNacimiento}'`);
    res.status(200).json({message, data: respuesta});
  } catch (error) {
    console.log('Error crudDoctor',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const listarConsulta = async (req,res) =>{
  console.log('listarConsulta',req.query);
  try {
    const respuesta = await da.obtenerDatos('select * from Consulta');
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error listarConsulta',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const crudConsulta = async (req,res) =>{
  console.log('crudConsulta',req.query);
  const {opcion,id,fecha,horaInicio,horaFin,cupo,idDoctor} = req.query
  let message = 'Registro insertado satisfactoriamente!';
  if(opcion=='U') message.replace('insertado','actualizado')
  if(opcion=='D') message.replace('insertado','eliminado')
  try {
    const respuesta = await da.obtenerDatos(`exec dbo.crudConsulta '${opcion}',${id},'${fecha}','${horaInicio}','${horaFin}',${cupo},${idDoctor}`);
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error crudConsulta',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const listarPaciente = async (req,res) =>{
  console.log('listarPaciente',req.query);
  try {
    const respuesta = await da.obtenerDatos('select * from Paciente');
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error listarPaciente',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const crudPaciente = async (req,res) =>{
  console.log('crudPaciente',req.query);
  const {opcion,id,nombre,apellidos,cedula,direccion,telefono,numeroSeguro,mutualidad,fechaNacimiento} = req.query
  let message = 'Registro insertado satisfactoriamente!';
  if(opcion=='U') message.replace('insertado','actualizado')
  if(opcion=='D') message.replace('insertado','eliminado')
  try {
    const respuesta = await da.obtenerDatos(`exec dbo.crudPaciente '${opcion}',${id},'${nombre}','${apellidos}','${cedula}','${direccion}','${telefono}','${numeroSeguro}','${mutualidad}','${fechaNacimiento}'`);
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error crudPaciente',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const listarReserva = async (req,res) =>{
  console.log('listarReserva',req.query);
  try {
    const respuesta = await da.obtenerDatos('select * from Reserva');
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error listarReserva',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}

export const crudReserva = async (req,res) =>{
  console.log('crudReserva',req.query);
  const {opcion,id,idConsulta,idPaciente,estado} = req.query
  let message = 'Registro insertado satisfactoriamente!';
  if(opcion=='U') message.replace('insertado','actualizado')
  if(opcion=='D') message.replace('insertado','eliminado')
  try {
    const respuesta = await da.obtenerDatos(`exec dbo.crudReserva '${opcion}',${id},${idConsulta},${idPaciente},${estado}`);
    res.status(200).json({message: 'Consulta exitosa!!!', data: respuesta});
  } catch (error) {
    console.log('Error crudReserva',error);
    res.status(500).json({message: 'Error consulta: , ' + error, data: []});
  }
}