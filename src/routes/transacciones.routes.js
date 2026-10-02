import { Router } from "express";
import  { crearTransaccion, buscarTransaccionPorId, editarTransaccion, eliminarTransaccion, listarTransacciones } from '../controllers/transacciones.controllers.js'
import verificarJWT from '../middlewares/verificarJWT.js'
import transaccionValidacion from '../middlewares/transaccionValidacion.js'

const router = Router()

router.route('/').post(verificarJWT, transaccionValidacion, crearTransaccion).get(verificarJWT, listarTransacciones)
router.route('/:id').get(verificarJWT, buscarTransaccionPorId).put(verificarJWT, editarTransaccion).delete(verificarJWT, eliminarTransaccion)

export default router