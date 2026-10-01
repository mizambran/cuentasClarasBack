import { Router } from "express";
import { crearCategoria, buscarCategoriaPorId, editarCategoria, eliminarCategoria, listarCategoria } from '../controllers/categorias.controllers.js'
import categoriaValidacion from "../middlewares/categoriaValidacion.js";
import verificarJWT from "../middlewares/verificarJWT.js";

const router = Router()

router.route('/').post(verificarJWT, categoriaValidacion , crearCategoria).get(verificarJWT, listarCategoria)
router.route('/:id').get(verificarJWT, buscarCategoriaPorId).put(verificarJWT, editarCategoria).delete(verificarJWT, eliminarCategoria)

export default router