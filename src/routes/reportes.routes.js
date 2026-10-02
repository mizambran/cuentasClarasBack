import { Router } from "express";
import verificarJWT from '../middlewares/verificarJWT.js'
import { totalPorConcepto } from "../controllers/reportes.controllers.js";


const router = Router()

router.route('/').get(verificarJWT, totalPorConcepto)

export default router