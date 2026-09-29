import mongoose, { Schema } from "mongoose";

const transaccionEsquema = new Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario',
        required:true
    },
    fecha:{
        type:Date,
        required:true,
        default: Date.now
    },
    tipo:{
        type:String,
        enum:['Ingreso', 'Gasto'],
        required:true
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'categoria',
        required:true
    },
    monto:{
        type:Number,
        required:true
    },
    cuenta:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cuenta',
        required:true
    },
    descripcion:{
        type:String
    },
    estado:{
        type:String,
        enum:['Pendiente', 'Completado'],
        default:'Pendiente'
    }
}, {
    timestamps:true
})

const Transaccion = mongoose.model('transaccion', transaccionEsquema)

export default Transaccion