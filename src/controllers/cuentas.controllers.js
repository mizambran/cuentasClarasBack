import { isValidObjectId } from "mongoose"
import Cuenta from "../models/cuenta.model.js"
import Transaccion from '../models/transaccion.model.js'

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


export const buscarCuentaPorId = async(req, res) => {
    try {
        const idCuenta = req.params.id
        if(!isValidObjectId(idCuenta)){
            return res.status(400).json({mensaje:"El id es inválido"})
        }
        const idUsuario = req.idUsuario
        const cuentaEncontrada = await Cuenta.findOne({usuario:idUsuario, _id:idCuenta})
        if(!cuentaEncontrada){
            return res.status(404).json({mensaje:"No se encontró la cuenta solicitada"})
        }
        res.status(200).json(cuentaEncontrada)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error, no se pudo buscar la cuenta solicitada"})
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

export const editarCuenta = async(req, res) => {
    try {
        const idCuenta = req.params.id
        if(!isValidObjectId(idCuenta)){
            return res.status(400).json({mensaje:"El id es inválido"})
        }
        const idUsuario = req.idUsuario
        const {nombre, tipo, saldoInicial, activo} = req.body
        const cuentaAEditar = await Cuenta.findOne({_id:idCuenta, usuario:idUsuario})
        if(!cuentaAEditar){
            return res.status(404).json({mensaje:"No se encontró la cuenta que intentas editar"})
        }

        // Defensa por si el front manda algo vacio
        const nombreAEvaluar = nombre || cuentaAEditar.nombre

        const cuentaDuplicada = await Cuenta.findOne({usuario:idUsuario, nombre:nombreAEvaluar, _id:{$ne:idCuenta}})
        if(cuentaDuplicada){
            return res.status(400).json({mensaje:"Ya tenes una cuenta creada con el mismo nombre"})
        }
        const cuentaActualizada = await Cuenta.findOneAndUpdate(
            {usuario:idUsuario, _id:idCuenta}, 
            req.body, 
            {runValidators:true, returnDocument:'after'})
        
        res.status(200).json({mensaje:"La cuenta fue actualizada con éxito!", cuenta:cuentaActualizada})
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({mensaje:"Error la cuenta ya existe"})
        }
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error, no se pudo editar la cuenta"})
    }
}

export const eliminarCuenta = async(req, res) => {
    try {
        const idCuenta = req.params.id
        if(!isValidObjectId(idCuenta)){
            return res.status(400).json({mensaje:"El id es inválido"})
        }
        const idUsuario = req.idUsuario
        const tieneOperaciones = await Transaccion.findOne({usuario:idUsuario, cuenta:idCuenta})
        if(tieneOperaciones){
            return res.status(400).json({mensaje:"La cuenta tiene movimientos asociados"})
        }
        const cuentaEncontrada = await Cuenta.findOne({_id:idCuenta, usuario:idUsuario})
        if(!cuentaEncontrada){
            return res.status(404).json({mensaje:"No se encontró la cuenta que intentas eliminar"})
        }
        res.status(200).json({mensaje:"Se eliminó la cuenta con éxito!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error, no se pudo eliminar la cuenta"})
    }
}
