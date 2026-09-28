import mongoose, { Schema } from "mongoose";


const usuarioEsquema = new Schema({
    nombre:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    edad:{
        type:Number,
        min:16,
        max:112,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(valor) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor)
            }, message:"El formato de email no es válido"
        }
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    rol:{
        type:String,
        required:true,
        enum:["admin", "cliente"],
        default: "cliente"
    },
    activo:{
        type:Boolean,
        required:true,
        default:true
    }
}, {
    timestamps:true
}
)

const Usuario = mongoose.model('usuario', usuarioEsquema)


export default Usuario