import { Router } from "express";
import validacionUsuario from '../middlewares/usuarioValidacion.js'
import  {  crearUsuario, editarUsuario,  login } from '../controllers/usuarios.controllers.js'
import usuarioValidacion from "../middlewares/usuarioValidacion.js";


const router = Router()

router.route('/').post(usuarioValidacion, crearUsuario)
router.route('/login').post(login)
//router.route('/paginado').get(usuarioPaginado)
router.route('/:id').put(usuarioValidacion, editarUsuario)

export default router