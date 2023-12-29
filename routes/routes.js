import express from 'express';
import {principal,listado,registro,crearCliente,eliminarCliente,editarCliente,guardar} from '../controllers/indexController.js';

const router = express.Router();
 
router.get('/', principal);
router.get('/listado', listado);

router.get('/registro', registro);
router.post('/registro', crearCliente);

router.get('/editar/:id', editarCliente);
router.get('/eliminar/:id', eliminarCliente);
router.post('/editar/:id', guardar);



export default router;