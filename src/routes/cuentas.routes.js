import { Router } from "express"
import { crearCuenta, buscarCuentaPorId, editarCuenta, eliminarCuenta, listarCuentas, listarCuentasConSaldos } from '../controllers/cuentas.controllers.js'
import verificarJWT from '../middlewares/verificarJWT.js'
import cuentaValidacion from '../middlewares/cuentaValidacion.js'

const router = Router()

router.route('/').post(verificarJWT, cuentaValidacion, crearCuenta).get(verificarJWT, listarCuentas)
router.route('/saldos').get(verificarJWT, listarCuentasConSaldos)
router.route('/:id').put(verificarJWT, editarCuenta).delete(verificarJWT, eliminarCuenta).get(verificarJWT, buscarCuentaPorId)

export default router