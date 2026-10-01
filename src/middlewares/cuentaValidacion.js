import { body } from 'express-validator'
import resultadoValidacion from './resultadoValidacion.js'


const cuentaValidacion = [
    body("nombre")
    .trim()
    .notEmpty().withMessage("Nombre es un dato obligatorio")
    .isLength({min:3, max:30}).withMessage("Debe tener entre 3 y 30 caracteres"),

    body("tipo")
    .trim()
    .notEmpty().withMessage("Tipo es un dato obligatorio")
    .isIn(['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Cuenta Bancaria', 'Billetera Virtual'])
    .withMessage("Tipo puede ser EFECTIVO, TARJETA DE CREDITO / DEBITO, CUENTA BANCARIA o BILLETERA VIRTUAL"),
    
    body("saldoInicio")
    .optional()
    .isNumeric().withMessage("El saldo inicial debe ser un número"),
    
    resultadoValidacion
]

export default cuentaValidacion