import { body } from "express-validator"
import resultadoValidacion from './resultadoValidacion.js'


const usuarioValidacion = [
body("nombre")
.trim()
.notEmpty().withMessage("El campo nombre es un dato obligatorio")
.isLength({min:3, max:30}),

body("edad")
.notEmpty().withMessage("El campo edad es un dato obligatorio")
.isNumeric({no_symbols:true}).withMessage("La edad debe ser un número válido")
.isInt({min:18, max:112}).withMessage("Tienes que ser mayor de 18 años")
.toInt(),

body("email")
.trim()
.notEmpty().withMessage("El campo email es un dato obligatorio")
.isEmail(),

body("password")
.trim()
.notEmpty().withMessage("El campo contraseña es un dato obligatorio")
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,64}$/)
.withMessage("La contraseña debe tener entre 8 y 64 caracteres, una minúscula, una mayúscula y un número"),

resultadoValidacion

]

export default usuarioValidacion