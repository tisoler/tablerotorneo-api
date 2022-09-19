import { Request, Response } from 'express'
import { ActualizarConfiguracion, ObtenerConfiguracion } from "../manejadores/configuracion"


export const RutaObtenerConfiguracion = async (req: Request, res: Response)=>{
  try {
    const configuracion = await ObtenerConfiguracion()
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}

export const RutaActualizarConfiguracion = async (req: Request, res: Response)=>{
  try {
    if (!req?.body) {
      res.sendStatus(400)
      return
    }
    const configuracion = await ActualizarConfiguracion(req.body)
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}
