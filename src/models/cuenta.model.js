import mongoose, { Schema } from "mongoose";


const cuentaEsquema = new Schema({
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usuario',
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        enum:['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Cuenta Bancaria', 'Billetera Virtual'],
        required:true
    },
    saldoInicio:{
        type:Number,
        required:true,
        default:0
    },
    activo:{
        type:Boolean,
        required:true,
        default:true
    }
}, {timestamps:true})

cuentaEsquema.index({ usuario: 1, nombre: 1  }, { unique: true });

const Cuenta = mongoose.model('cuenta', cuentaEsquema)

export default Cuenta