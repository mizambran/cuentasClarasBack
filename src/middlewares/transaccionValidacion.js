import { body } from "express-validator";

const transaccionValidacion = [
    
    body("tipo")
        .trim()
        .notEmpty().withMessage("El tipo de transacción es obligatorio")
        .isIn(['Ingreso', 'Gasto']).withMessage("El tipo solo puede ser 'Ingreso' o 'Gasto'"),

    body("categoria")
        .notEmpty().withMessage("Tenés que seleccionar una categoría")
        .isMongoId().withMessage("El ID de la categoría tiene un formato inválido"),

    body("cuenta")
        .notEmpty().withMessage("Tenés que seleccionar una cuenta")
        .isMongoId().withMessage("El ID de la cuenta tiene un formato inválido"),

    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isNumeric().withMessage("El monto debe ser un valor numérico")
        .isFloat({ min: 0 }).withMessage("El monto no puede ser negativo"),

    body("fecha")
        .optional() // Es opcional porque tu esquema tiene 'default: Date.now'
        .isISO8601().withMessage("La fecha ingresada no tiene un formato válido"),

    body("descripcion")
        .optional() 
        .trim()
        .isLength({ max: 200 }).withMessage("La descripción no puede superar los 200 caracteres"),

    body("estado")
        .optional() 
        .isIn(['Pendiente', 'Completado']).withMessage("El estado debe ser 'Pendiente' o 'Completado'")
];

export default transaccionValidacion