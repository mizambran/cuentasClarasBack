import mongoose, { Schema } from "mongoose";


const categoriaEsquema = new Schema({
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usuario',
        required:true
    },
    nombre:{
        type:String,
        minLength: 3,
        maxLength: 40,
        required:true
    },
    tipo:{
        type:String,
        enum:['Ingreso', 'Gasto'],
        required:true
    },
    concepto:{
        type:String,
        enum:['Fijo','Variable','Extra'],
        required:true
    }
}, {
    timestamps:true
})

// Indice compuesto para evitar que un mismo usuario cree dos categorías llamadas igual con el mismo tipo
categoriaEsquema.index({ nombre: 1, tipo: 1, usuario: 1 }, { unique: true });

const Categoria = mongoose.model('categoria', categoriaEsquema)

export default Categoria