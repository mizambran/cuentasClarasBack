import { isValidObjectId } from "mongoose";
import Categoria from "../models/categoria.model.js";
import Transaccion from "../models/transaccion.model.js";
import Cuenta from "../models/cuenta.model.js";

export const listarTransacciones = async (req, res) => {
  try {
    const idUsuario = req.idUsuario;
    const transacciones = await Transaccion.find({ usuario: idUsuario });
    res.status(200).json(transacciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "No se pudo listar las transacciones" });
  }
};

export const buscarTransaccionPorId = async (req, res) => {
  try {
    const idTransaccion = req.params.id;
    if (!isValidObjectId(idTransaccion)) {
      return res.status(400).json({ mensaje: "El id es inválido" });
    }
    const idUsuario = req.idUsuario;
    const transaccionEncontrada = await Transaccion.findOne({
      _id: idTransaccion,
      usuario: idUsuario,
    });
    if (!transaccionEncontrada) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el movimiento que buscas" });
    }
    res.status(200).json(transaccionEncontrada);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar buscar el movimiento" });
  }
};

export const crearTransaccion = async (req, res) => {
  try {
    const idUsuario = req.idUsuario;
    const { categoria } = req.body; // es el id de la categoria que manda el front

    // validamos si que la categoria existe para el usuario
    const categoriaValida = await Categoria.findOne({
      _id: categoria,
      usuario: idUsuario,
    });
    if (!categoriaValida) {
      return res.status(400).json({ mensaje: "La categoría no existe" });
    }

    const nuevaTransaccion = new Transaccion({
      usuario: idUsuario,
      ...req.body,
    });
    await nuevaTransaccion.save();
    res.status(201).json({ mensaje: `Registro creado con éxito!` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error, no se pudo grabar la transacción" });
  }
};

export const editarTrasaccion = async (req, res) => {
  try {
    const idTransaccion = req.params.id;
    if (!isValidObjectId(idTransaccion)) {
      return res.status(400).json({ mensaje: "El id es inválido" });
    }
    const idUsuario = req.idUsuario;
    const { categoria, cuenta } = req.body;
    
    if (categoria) {
      // validamos si el usuario tiene la categoria creada
      const categoriaValida = await Categoria.findOne({
        _id: categoria,
        usuario: idUsuario,
      });
      if (!categoriaValida) {
        return res
          .status(400)
          .json({
            mensaje: `La categoria : ${categoria} no esta relacionada a tu usuario`,
          });
      }
    }
    if (cuenta) {
        const cuentaValida = await Cuenta.findOne({_id:cuenta, usuario:idUsuario})
        if(!cuentaValida){
            return res.status(400).json({
                mensaje:`La cuenta: ${cuenta} no esta relacionada a tu usuario`
            })
        }
    }

    // Si pasó las validaciones (o si no mandó ni categoría ni cuenta), actualizamos tranquilos
        const transaccionEncontrada = await Transaccion.findOneAndUpdate(
            {_id: idTransaccion, usuario: idUsuario},
            req.body,
            {runValidators: true, returnDocument: 'after'}
        );
        
        if(!transaccionEncontrada){
            return res.status(404).json({mensaje:"No se encontró el movimiento que intentas editar"});
        }
            
        res.status(200).json({
            mensaje: "Se editó correctamente el movimiento",
            transaccion: transaccionEncontrada // mando el documento editado
        });

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar editar el movimiento" });
  }
};

export const eliminarTransaccion = async (req, res) => {
  try {
    const idTransaccion = req.params.id;
    if (!isValidObjectId(idTransaccion)) {
      return res.status(400).json({ mensaje: "El id es inválido" });
    }
    const idUsuario = req.idUsuario;
    const transaccionEncontrada = await Transaccion.findOneAndDelete({
      _id: idTransaccion,
      usuario: idUsuario,
    });
    if (!transaccionEncontrada) {
      return res
        .status(404)
        .json({
          mensaje: "No se encontró el movimiento que intentas eliminar",
        });
    }
    res.status(200).json({ mensaje: "Se eliminó el movimiento con éxito!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar eliminar el movimiento" });
  }
};
