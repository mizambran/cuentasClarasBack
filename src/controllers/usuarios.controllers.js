import { isValidObjectId } from 'mongoose'
import Usuario from '../models/usuario.js'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'



export const listarUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo listar los usuarios"})
    }
}

export const buscarUsuario = async(req, res) => {
    try {
        const id = req.params.id 
        if(!isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id no es válido"})
        }
        const usuarioEncontrado = await Usuario.findById(id)
        if(!usuarioEncontrado){
            return res.status(404).json({mensaje:"No se encontró el usuario solicitado"})
        }
        res.status(200).json(usuarioEncontrado)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo buscar el usuario"})
    }
}

export const crearUsuario = async(req, res) => {
    try {
        const existeElUsuario = await Usuario.findOne({email:req.body.email})
        if(existeElUsuario){
            return res.status(400).json({mensaje:"Ya existe un usuario con este email"})
        }
        const saltos = genSaltSync(10)
        req.body.password = hashSync(req.body.password, saltos)
        const nuevoUsuario = new Usuario(req.body)
        await nuevoUsuario.save()
        res.status(201).json({mensaje:"Usuario creado con éxito!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo crear el usuario"})
    }
}

export const editarUsuario = async(req, res) => {
    try {
        const id = req.params.id
        if(!isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id es inválido"})
        }
        const existeElUsuario = await Usuario.findOne({email:req.body.email})
        if(existeElUsuario && existeElUsuario._id.toString() !== id){
            return res.status(400).json({mensaje:"Ya existe otro usuario con este email"})
        }
        if(req.body.password){
            const saltos = genSaltSync(10)
            req.body.password = hashSync(req.body.password, saltos)
        }
        const usuarioEncontrado = await Usuario.findByIdAndUpdate(id, req.body, {returnDocument:'after', runValidators:true})
        if(!usuarioEncontrado){
            return res.status(404).json({mensaje:"No se encontró el usuario que intentas editar"})
        }
        res.status(200).json({mensaje:"Se editó con éxito!"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo editar el usuario"})
    }
}

export const eliminarUsuario = async(req, res) => {
    try {
        const id = req.params.id
        if(!isValidObjectId(id)){
            return res.status(400).json({mensaje:"El id es inválido"})
        }
        const usuarioEncontrado = await Usuario.findByIdAndDelete(id)
        if(!usuarioEncontrado){
            return res.status(404).json({mensaje:"No se encontró el usuario que intentas eliminar"})
        }
        res.status(200).json({mensaje:"Se eliminó el usuario"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo eliminar el usuario"})
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        const usuarioEncontrado = await Usuario.findOne({email})
        if(!usuarioEncontrado){
            return res.status(400).json({mensaje:"Email inválido"})
        }
        const esPasswordValida = compareSync(password, usuarioEncontrado.password)
        if(!esPasswordValida){
            return res.status(400).json({mensaje:"Contraseña inválida"})
        }
        res.status(200).json({
            mensaje:"Login exitoso!",
            nombre:usuarioEncontrado.nombre,
            email:usuarioEncontrado.email,
            rol:usuarioEncontrado.rol,
            id:usuarioEncontrado._id
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Error al intentar iniciar sesión"})
    }
}


export const usuarioPaginado = async(req, res) => {
    try {
        let page = req.query.page || 1
        let limit = req.query.page || 10
        let skip = (page -1) * limit

        const [usuarios, cantUsuarios] = await Promise.all([
            Usuario.find().skip(skip).limit(limit),
            Usuario.countDocuments()
        ])
        res.status(200).json({
            usuarios,
            paginaActual:page,
            cantUsuarios,
            cantidadPage: Math.ceil(cantUsuarios / limit)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"No se pudo paginar los usuarios"})
    }
}