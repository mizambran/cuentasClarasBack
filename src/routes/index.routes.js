import { Router } from "express"
import usuariosRoutes from './usuarios.routes.js'
import transaccionesRoutes from './transacciones.routes.js'
import categoriasRoutes from './categorias.routes.js'
import cuentasRoutes from './cuentas.routes.js'

const router = Router()

router.use('/usuarios', usuariosRoutes)
router.use('/transacciones', transaccionesRoutes)
router.use('/categorias', categoriasRoutes)
router.use('/cuentas', cuentasRoutes)


export default router