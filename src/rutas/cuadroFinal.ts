import { Response } from 'express'
import { CrearActualizarCuadroFinalParaTorneo, ObtenerCuadroFinalParaTorneo } from '../manejadores/cuadroFinal'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerCuadroFinalParaTorneo = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.params?.idTorneo && !req?.usuario?.idTorneo || req.params?.idTorneo && isNaN(Number(req.params.idTorneo))) {
      res.sendStatus(400)
      return
    }
    const idTorneo = req.params?.idTorneo ? parseInt(req.params.idTorneo) : req?.usuario?.idTorneo
    const cuadroFinal = await ObtenerCuadroFinalParaTorneo(idTorneo || -1)
    res.status(200).json(cuadroFinal)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCrearActualizarCuadroParaTorneo = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req?.body || !req?.usuario?.idTorneo) {
      res.sendStatus(400)
      return
    }
    const idTorneo = req.params?.idTorneo ? parseInt(req.params.idTorneo) : req?.usuario?.idTorneo
    const cuadroFinal = await CrearActualizarCuadroFinalParaTorneo(idTorneo || -1, req.body)
    res.status(200).json(cuadroFinal)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
