import Transaccion from '../models/transaccion.js'



export const listarTransacciones = async(req, res) => {
    try {
        const transacciones = await Transaccion.find()
        res.status(200).json(transacciones)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo listar las transacciones"})
    }
}