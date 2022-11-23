import { Request, Response } from 'express'
import { ObtenerPartidoFutbolActual, ActualizarPartidoFutbolActual, CrearPartidoFutbolActual, BorrarPartidoFutbolActual } from '../manejadores/partidoFutbol'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerPartidoFutbolActual = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.params?.idTorneo && !req?.usuario?.idTorneo || req.params?.idTorneo && isNaN(Number(req.params.idTorneo))) {
      res.sendStatus(400)
      return
    }
    const idTorneo = req.params?.idTorneo ? parseInt(req.params?.idTorneo) : req?.usuario?.idTorneo
    const partidoActual = await ObtenerPartidoFutbolActual(idTorneo || -1)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCrearPartidoFutbolActual = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await CrearPartidoFutbolActual(req.usuario.idTorneo, req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarPartidoFutbolActual = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo || !req.params?.idPartidoFutbol || isNaN(Number(req.params.idPartidoFutbol))) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await ActualizarPartidoFutbolActual(req.usuario.idTorneo, parseInt(req.params.idPartidoFutbol), req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaBorrarPartidoFutbolActual = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo || !req.params?.idPartidoFutbol || isNaN(Number(req.params.idPartidoFutbol))) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await BorrarPartidoFutbolActual(req.usuario.idTorneo, parseInt(req.params.idPartidoFutbol), req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
