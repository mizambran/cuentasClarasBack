import { Router } from "express"
import { crearCuenta, buscarCuentaPorId, editarCuenta, eliminarCuenta, listarCuentas } from '../controllers/cuentas.controllers.js'
import verificarJWT from '../middlewares/verificarJWT.js'


const router = Router()

router.route('/').post(verificarJWT, crearCuenta).get(verificarJWT, listarCuentas)
router.route('/:id').put(verificarJWT, editarCuenta).delete(verificarJWT, eliminarCuenta).get(verificarJWT, buscarCuentaPorId)

export default router