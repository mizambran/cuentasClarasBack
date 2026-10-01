import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";



const categoriaValidacion = [
    body("nombre")
    .trim()
    .notEmpty().withMessage("Nombre es un campo obligatorio")
    .isLength({min:3, max:40}).withMessage("El nombre debe tener entre 3 y 40 caracteres"),
    
    body("tipo")
    .trim()
    .notEmpty().withMessage("Tipo es un dato obligatorio"),

    body("concepto")
    .trim()
    .notEmpty().withMessage("Concepto es un campo obligatorio"),
    
    resultadoValidacion
]

export default categoriaValidacion