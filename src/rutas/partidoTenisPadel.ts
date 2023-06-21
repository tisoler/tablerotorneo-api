import { Response } from 'express'
import {
  ObtenerPartidosTenisPadelActuales,
  ActualizarPartidoTenisPadel,
  ActualizarGame,
  CrearPartidoTenisPadel,
  BorrarPartidoTenisPadel,
  ObtenerPartidosTenisPadelParaTorneo
} from '../manejadores/partidoTenisPadel'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerPartidosTenisPadelActuales = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.params?.idTorneo && !req?.usuario?.idTorneo || req.params?.idTorneo && isNaN(Number(req.params.idTorneo))) {
      res.sendStatus(400)
      return
    }
    const idTorneo = req.params?.idTorneo ? parseInt(req.params?.idTorneo) : req?.usuario?.idTorneo
    const partidosTenisPadel = await ObtenerPartidosTenisPadelActuales(idTorneo || -1)
    res.status(200).json(partidosTenisPadel)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaObtenerPartidosTenisPadelParaTorneo = async (req: RequestConUsuario, res: Response) => {
  try {
    const idTorneo = req.params?.idTorneo
    if (!idTorneo || isNaN(Number(idTorneo))) {
      res.sendStatus(400)
      return
    }
    const partidosTenisPadel = await ObtenerPartidosTenisPadelParaTorneo(parseInt(idTorneo) || -1)
    res.status(200).json(partidosTenisPadel)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCrearPartidoTenisPadel = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo) {
      res.sendStatus(400)
      return
    }
    const partidosTenisPadel = await CrearPartidoTenisPadel(req.usuario.idTorneo, req.body)
    res.status(200).json(partidosTenisPadel)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarPartidoTenisPadel = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo || !req.params?.idPartidoTenisPadel || isNaN(Number(req.params.idPartidoTenisPadel))) {
      res.sendStatus(400)
      return
    }
    const partidosTenisPadel = await ActualizarPartidoTenisPadel(req.usuario.idTorneo, parseInt(req.params.idPartidoTenisPadel), req.body)
    res.status(200).json(partidosTenisPadel)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaBorrarPartidoTenisPadel = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo || !req.params?.idPartidoTenisPadel || isNaN(Number(req.params.idPartidoTenisPadel))) {
      res.sendStatus(400)
      return
    }
    const partidosTenisPadel = await BorrarPartidoTenisPadel(req.usuario.idTorneo, parseInt(req.params.idPartidoTenisPadel), req.body)
    res.status(200).json(partidosTenisPadel)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarGame = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.body || !req?.usuario?.idTorneo || !req.params?.idPartidoTenisPadel || isNaN(Number(req.params.idPartidoTenisPadel))) {
      res.sendStatus(400)
      return
    }
    // Validamos acceso con idTorneo
    const partidosTenisPadel = await ActualizarGame(req.usuario.idTorneo, parseInt(req.params.idPartidoTenisPadel), req.body)
    res.status(200).json(partidosTenisPadel)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
