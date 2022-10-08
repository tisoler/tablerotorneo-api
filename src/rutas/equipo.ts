import { Request, Response } from 'express'
import { ActualizarEquipo, ObtenerEquipos } from '../manejadores/equipo'

export const RutaObtenerEquipos = async (req: Request, res: Response)=>{
  try {
    const equipos = await ObtenerEquipos()
    res.status(200).json(equipos)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarEquipo = async (req: Request, res: Response)=>{
  try {
    if (!req.params?.idEquipo && !req?.body) {
      res.sendStatus(400)
      return
    }
    const configuracion = await ActualizarEquipo(parseInt(req.params.idEquipo), req.body)
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
