import jwt from "jsonwebtoken"


const verificarJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.autorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({mensaje:"La petición no tiene token"})
        }
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.SECRETJWT)
        req.idUsuario = payload.id 
        req.rolUsuario = payload.rol
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({mensaje:"El token no es válido o expiró"})
    }
}

export default verificarJWT