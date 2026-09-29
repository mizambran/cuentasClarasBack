import Categoria from '../models/categoria.model.js'
import Transaccion from '../models/transaccion.js'



export const listarTransacciones = async(req, res) => {
    try {
        const idUsuario = req.idUsuario
        const transacciones = await Transaccion.find({usuario:idUsuario})
        res.status(200).json(transacciones)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo listar las transacciones"})
    }
}

export const crearTransaccion = async(req, res) => {
    try {
        const idUsuario = req.idUsuario
        const {categoria} = req.body // es el id de la categoria que manda el front
        
        // validamos que la categoria exista para el usuario
        const categoriaValida = await Categoria.findOne({_id:categoria, usuario:idUsuario})
        if(!categoriaValida){
            return res.status(400).json({mensaje:"La categoría no existe"})
        }

        const nuevaTransaccion = new Transaccion({usuario:idUsuario, ...req.body })
        await nuevaTransaccion.save()
        res.status(201).json({mensaje:`Registro creado con éxito!`})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error, no se pudo grabar la transacción"})
    }
}