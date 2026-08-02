import { Router } from "express"
import usuariosRoutes from './usuarios.routes.js'
import transaccionesRoutes from './transacciones.routes.js'
import categoriasRoutes from './categorias.routes.js'

const router = Router()

router.use('/usuarios', usuariosRoutes)
router.use('/transacciones', transaccionesRoutes)
router.use('/categorias', categoriasRoutes)


export default router