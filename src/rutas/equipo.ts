import { Response } from 'express'
import { ActualizarEquipo, ObtenerEquiposParaTorneo } from '../manejadores/equipo'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerEquiposParaTorneo = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.params?.idTorneo && !req?.usuario?.idTorneo || req.params?.idTorneo && isNaN(Number(req.params.idTorneo))) {
      res.sendStatus(400)
      return
    }
    const idTorneo = req.params?.idTorneo ? parseInt(req.params.idTorneo) : req?.usuario?.idTorneo
    const equipos = await ObtenerEquiposParaTorneo(idTorneo || -1)
    res.status(200).json(equipos)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarEquipo = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.params?.idEquipo || !req?.usuario?.idTorneo || !req?.body) {
      res.sendStatus(400)
      return
    }
    const configuracion = await ActualizarEquipo(req.usuario.idTorneo, parseInt(req.params.idEquipo), req.body)
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
