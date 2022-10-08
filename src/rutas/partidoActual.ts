import { Request, Response } from 'express'
import { ObtenerPartidoActual, ActualizarPartidoActual, ActualizarGame } from '../manejadores/partidoActual'

export const RutaObtenerPartidoActual = async (req: Request, res: Response)=>{
  try {
    const partidoActual = await ObtenerPartidoActual()
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarPartidoActual = async (req: Request, res: Response)=>{
  try {
    const partidoActual = await ActualizarPartidoActual(req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarGame = async (req: Request, res: Response)=>{
  try {
    const partidoActual = await ActualizarGame(req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
