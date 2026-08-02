import jwt from "jsonwebtoken"
import Usuario from '../models/usuario.js'

const verificarJWT = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({mensaje:"La petición no tiene token"})
        }
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.SECRETJWT)
        const usuarioEncontrado = await Usuario.findById(payload.id)
        if(!usuarioEncontrado){
            return res.status(401).json({mensaje:"No existe un usuario válido"})
        }
        req.idUsuario = payload.id 
        req.rolUsuario = payload.rol
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({mensaje:"El token no es válido o expiró"})
    }
}

export default verificarJWT