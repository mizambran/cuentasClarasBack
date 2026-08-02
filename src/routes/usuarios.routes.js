import { Router } from "express";
import validacionUsuario from '../middlewares/usuarioValidacion.js'
import  { listarUsuarios, buscarUsuario, crearUsuario, editarUsuario, usuarioPaginado, eliminarUsuario, login } from '../controllers/usuarios.controllers.js'
import usuarioValidacion from "../middlewares/usuarioValidacion.js";


const router = Router()

router.route('/').get(listarUsuarios).post(usuarioValidacion, crearUsuario)
router.route('/login').post(login)
//router.route('/paginado').get(usuarioPaginado)
router.route('/:id').get(buscarUsuario).put(usuarioValidacion, editarUsuario)

export default router