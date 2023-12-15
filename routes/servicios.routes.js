import { Router } from "express";
import * as metods from '../controllers/metods.js'

const router = Router();


/*******Doctor */
router.get('/api/listarDoctor',metods.listarDoctor);
router.get('/api/listarEspecialidad',metods.listarEspecialidad);
router.get('/api/listarConsulta',metods.listarConsulta);
router.get('/api/listarPaciente',metods.listarPaciente);
router.get('/api/crudDoctor',metods.crudDoctor);
router.get('/api/crudEspecialidad',metods.crudEspecialidad);
router.get('/api/crudConsulta',metods.crudConsulta);
router.get('/api/crudPaciente',metods.crudPaciente);
router.get('/api/listarUsuarios',metods.listarUsuarios);
router.post('/api/login',metods.login);
router.get('/api/crudUsuario',metods.crudUsuario);

export default router;