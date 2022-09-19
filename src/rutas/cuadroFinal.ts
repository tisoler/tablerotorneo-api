import { Request, Response } from 'express'
import { ActualizarCuadroFinal, ObtenerCuadroFinal } from '../manejadores/cuadroFinal'


export const RutaObtenerCuadroFinal = async (req: Request, res: Response)=>{
  try {
    const cuadroFinal = await ObtenerCuadroFinal()
    res.status(200).json(cuadroFinal)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}

export const RutaActualizarCuadroFinal = async (req: Request, res: Response)=>{
  try {
    if (!req?.body) {
      res.sendStatus(400)
      return
    }
    const cuadroFinal = await ActualizarCuadroFinal(req.body)
    res.status(200).json(cuadroFinal)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}
