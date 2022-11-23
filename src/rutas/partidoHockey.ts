import { Request, Response } from 'express'
import { ObtenerPartidoHockeyActual, ActualizarPartidoHockeyActual, CrearPartidoHockeyActual, BorrarPartidoHockeyActual } from '../manejadores/partidoHockey'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerPartidoHockeyActual = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.params?.idTorneo && !req?.usuario?.idTorneo || req.params?.idTorneo && isNaN(Number(req.params.idTorneo))) {
      res.sendStatus(400)
      return
    }
    const idTorneo = req.params?.idTorneo ? parseInt(req.params?.idTorneo) : req?.usuario?.idTorneo
    const partidoActual = await ObtenerPartidoHockeyActual(idTorneo || -1)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCrearPartidoHockeyActual = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await CrearPartidoHockeyActual(req.usuario.idTorneo, req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarPartidoHockeyActual = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo || !req.params?.idPartidoHockey || isNaN(Number(req.params.idPartidoHockey))) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await ActualizarPartidoHockeyActual(req.usuario.idTorneo, parseInt(req.params.idPartidoHockey), req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaBorrarPartidoHockeyActual = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo || !req.params?.idPartidoHockey || isNaN(Number(req.params.idPartidoHockey))) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await BorrarPartidoHockeyActual(req.usuario.idTorneo, parseInt(req.params.idPartidoHockey), req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
