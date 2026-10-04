import Transaccion from "../models/transaccion.model.js";

export const totalPorConcepto = async (req, res) => {
  try {
    const idUsuario = req.idUsuario;

    const transaccionesEnc = await Transaccion.find({ usuario: idUsuario })
      .populate("categoria", "concepto")
      .lean();

    const totales = transaccionesEnc.reduce((acc, item) => {
        const conceptoEnc = item.categoria?.concepto || "Sin concepto"
        
        const totalDe = item.tipo === 'Ingreso' ? 'ingresos' : 'gastos'
        if(acc[totalDe][conceptoEnc] === undefined){
            acc[totalDe][conceptoEnc] = 0
        }
        acc[totalDe][conceptoEnc] += item.monto
        return acc
    }, {ingresos:{}, gastos:{}})

    res.status(200).json(totales)

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar armar el reporte" });
  }
};

// presupuesto 
// transaccion tienen monto
// necesito mostrar total por nombre (categoria)
// seguir viendo luego

export const presupuestoReal = async(req, res) => {
  try {
    const idUsuario = req.idUsuario
    const transacciones = await Transaccion
    .find({usuario:idUsuario})
    .populate('categoria')
    .populate('cuenta')
    .lean()

    const resumenCategoria = transacciones?.reduce((acc, item) => {
      const categoriaEnc = item.categoria?.nombre || "Sin categoria"
      const tipoTransac = item.tipo

      if(acc[categoriaEnc] === undefined){
        acc[categoriaEnc] = 0
      }
      if(tipoTransac === 'Ingreso'){
        acc[categoriaEnc] += item.monto
      } else {
        acc[categoriaEnc] -= item.monto
      }  
      return acc
    }, {})

    const resumenCuenta = transacciones?.reduce((acc, item) => {
      const cuentaEnc = item.cuenta?.nombre || "Sin cuenta"
      const tipoTransac = item.tipo 

      if(acc[cuentaEnc] === undefined){
        acc[cuentaEnc] = 0
      }
      if(tipoTransac === 'Gasto'){
        acc[cuentaEnc] += item.monto
      } else {
        acc[cuentaEnc] -= item.monto
      }  
      return acc
    }, {})
    
    res.status(200).json({
      totalCategoria:resumenCategoria,
      totalCuenta:resumenCuenta
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({mensaje:"Ocurrió un error al generar el reporte con los resumenes de categoria y cuenta"})    
  }
}
