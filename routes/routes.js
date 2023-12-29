import express from 'express';
import {principal,listado,registro,crearCliente,eliminarCliente,editarCliente,guardar} from '../controllers/indexController.js';

const router = express.Router();
 
router.get('/', principal);
router.get('/listado', listado);
router.get('/registro', registro);


router.post('/registro', crearCliente);
router.post('/listado', eliminarCliente);
router.post('/editar', editarCliente);
router.post('/listado', listado);
router.post('/actualizarCliente', guardar);

export default router;