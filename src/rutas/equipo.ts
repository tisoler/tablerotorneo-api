import { Request, Response } from 'express'
import { ObtenerEquipos } from '../manejadores/equipo'

export const RutaObtenerEquipos = async (req: Request, res: Response)=>{
  try {
    const equipos = await ObtenerEquipos()
    res.status(200).json(equipos)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}
