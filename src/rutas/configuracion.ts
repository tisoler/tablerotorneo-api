import { Request, Response } from 'express'
import { ActualizarConfiguracion, ObtenerConfiguracion } from "../manejadores/configuracion"


export const RutaObtenerConfiguracion = async (req: Request, res: Response)=>{
  try {
    if (!req.params?.idDisciplinaClub && !req?.body) {
      res.sendStatus(400)
      return
    }
    const configuracion = await ObtenerConfiguracion(parseInt(req.params?.idDisciplinaClub))
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarConfiguracion = async (req: Request, res: Response)=>{
  try {
    if (!req.params?.idDisciplinaClub && !req?.body) {
      res.sendStatus(400)
      return
    }
    if (!req?.body) {
      res.sendStatus(400)
      return
    }
    const configuracion = await ActualizarConfiguracion(parseInt(req.params?.idDisciplinaClub), req.body)
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
