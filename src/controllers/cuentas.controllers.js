import Cuenta from "../models/cuenta.model.js"


export const listarCuentas = async(req, res) => {
    try {
        const idUsuario = req.idUsuario
        const cuentas = await Cuenta.find({usuario:idUsuario})
        res.status(200).json(cuentas)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error, no se pudo listar las cuentas"})
    }
}

export const crearCuenta = async(req, res) => {
    try {
        const idUsuario = req.idUsuario
        const {nombre} = req.body
        const yaExisteCuenta = await Cuenta.findOne({nombre:nombre, usuario:idUsuario})
        if(yaExisteCuenta){
            return res.status(400).json({mensaje:"Ya tenes creada esta cuenta"})
        }
        const nuevaCuenta = new Cuenta({
            usuario:idUsuario,
            ...req.body
        })
        await nuevaCuenta.save()
        res.status(201).json({mensaje:"Creaste una nueva cuenta"})
    } catch (error) {
 
        // Si hace doble clic e intenta crearla doble
        if(error.code === 11000){
            return res.status(400).json({ mensaje: "Error: Ya tenés una cuenta con este nombre." });
        }
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error, no se pudo crear la cuenta"})
    }
}