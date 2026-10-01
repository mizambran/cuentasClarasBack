import { Router } from "express";
import  { crearTransaccion, buscarTransaccionPorId, editarTransaccion, eliminarTransaccion, listarTransacciones } from '../controllers/transacciones.controllers.js'
import verificarJWT from '../middlewares/verificarJWT.js'


const router = Router()

router.route('/').post(verificarJWT, crearTransaccion).get(verificarJWT, listarTransacciones)
router.route('/:id').get(verificarJWT, buscarTransaccionPorId).put(verificarJWT, editarTransaccion).delete(verificarJWT, eliminarTransaccion)

export default router