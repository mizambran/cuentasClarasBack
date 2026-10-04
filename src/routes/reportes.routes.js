import { Router } from "express";
import verificarJWT from '../middlewares/verificarJWT.js'
import { presupuestoReal, totalPorConcepto } from "../controllers/reportes.controllers.js";


const router = Router()

router.route('/').get(verificarJWT, totalPorConcepto)
router.route('/presupuesto').get(verificarJWT, presupuestoReal)

export default router