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


