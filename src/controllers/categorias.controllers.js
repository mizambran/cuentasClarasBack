import { isValidObjectId } from "mongoose"
import Categoria from "../models/categoria.model.js"



export const crearCategoria = async(req, res) => {
    try {
    const {nombre, tipo, concepto} = req.body
    
    // 2. Extraemos el ID del usuario que nuestro middleware verificarJWT sacó del token
    const idUsuario = req.idUsuario
   
    const existeCategoria = await Categoria.findOne({
        nombre:nombre,
        tipo:tipo,
        usuario:idUsuario
    })
    if(existeCategoria){
        return res.status(400).json({mensaje:"Ya existe una categoría con este nombre"})
    }
    const nuevaCategoria = new Categoria({
        usuario:idUsuario,
        nombre,
        tipo,
        concepto
    })

    await nuevaCategoria.save()
    res.status(200).json({mensaje:"Categoría creada con éxito!"})

    } catch (error) {
    if(error.code === 11000){
        return res.status(400).json({mensaje:"Error: esta categoría ya existe"})
    }
    console.error(error)
    res.status(500).json({mensaje:"No se pudo crear la categoría"})       
    }
}

export const editarCategoria = async(req, res) => {
    try {
        const idCategoria = req.params.id 
        if(!isValidObjectId(idCategoria)){
            return res.status(400).json({mensaje:"El id es inválido"})
        }
        const idUsuario = req.idUsuario // el dueño de la categoría
        const {nombre, tipo, concepto} = req.body
        const categoriaAEditar = await Categoria.findOne({_id:idCategoria, usuario:idUsuario})

        if(!categoriaAEditar){
            return res.status(404).json({mensaje:"No se encontró la categoría que estas buscando"})
        }

        // Definimos qué valores vamos a evaluar (los nuevos que manda el body, o los viejos si no mandó nada)
        const nombreEvaluar = nombre || categoriaAEditar.nombre;
        const tipoEvaluar = tipo || categoriaAEditar.tipo;

        const categoriaDuplicada = await Categoria.findOne({
            nombre: nombreEvaluar,
            tipo: tipoEvaluar,
            usuario: idUsuario,
            _id: { $ne: idCategoria } //  Excluimos el ID de la categoría actual
        });

        if(categoriaDuplicada){
            return res.status(400).json({mensaje:`Ya tenes otra categoría de tipo: ${tipoEvaluar} llamada ${nombreEvaluar}`})
        }

        const categoriaActualizada = await Categoria.findOneAndUpdate({_id:idCategoria, usuario:idUsuario}, req.body, {runValidators:true, returnDocument:'after'})

        res.status(200).json({ 
            mensaje: "¡Categoría editada con éxito!",
            categoria: categoriaActualizada 
        });

    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({mensaje:"Error: La categoría ya existe"})
        }
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error al intentar actualizar la categoría"})
    }
}

export const eliminarCategoria = async(req, res) => {
    try {
        const idCategoria = req.params.id
        if(!isValidObjectId(idCategoria)){
            return res.status(400).json({mensaje:"El id es inválido"})
        }
        const existeCategoria = await Categoria.findOneAndDelete({_id:idCategoria, usuario:req.idUsuario})
        if(!existeCategoria){
            return res.status(404).json({mensaje:"No se encontró la categoría que intentas eliminar"})
        }
        res.status(200).json({mensaje:"Se eliminó la categoria"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error al intentar eliminar la categoria"})
    }
}

export const listarCategoria = async(req, res) => {
    try {
        const categorias = await Categoria.find({usuario:req.idUsuario})
        res.status(200).json(categorias)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error al intentar listar las categorias"})
    }
}

export const buscarCategoriaPorId = async(req, res) => {
    try {
        const idCategoria = req.params.id
        if(!isValidObjectId(idCategoria)){
            return res.status(400).json({mensaje:"El id es inválido"})
        }
        const idUsuario = req.idUsuario
        const categoriaEncontrada = await Categoria.findOne({_id:idCategoria, usuario:idUsuario})
        if(!categoriaEncontrada){
            return res.status(404).json({mensaje:"No se encontró la categoría que estas buscando"})
        }
        res.status(200).json(categoriaEncontrada)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje:"Ocurrió un error al intentar buscar la categoría"})
    }
}


