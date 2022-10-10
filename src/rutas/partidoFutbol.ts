import { Request, Response } from 'express'
import { ObtenerPartidoFutbolActual, ActualizarPartidoFutbolActual, CrearPartidoFutbolActual, BorrarPartidoFutbolActual } from '../manejadores/partidoFutbol'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerPartidoFutbolActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.params?.idDisciplinaClub && !req?.usuario?.idDisciplinaClub || req.params?.idDisciplinaClub && isNaN(Number(req.params.idDisciplinaClub))) {
      res.sendStatus(400)
      return
    }
    const idDisciplinaClub = req.params?.idDisciplinaClub ? parseInt(req.params?.idDisciplinaClub) : req?.usuario?.idDisciplinaClub
    const partidoActual = await ObtenerPartidoFutbolActual(idDisciplinaClub || -1)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCrearPartidoFutbolActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.body || !req?.usuario?.idDisciplinaClub) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await CrearPartidoFutbolActual(req.usuario.idDisciplinaClub, req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarPartidoFutbolActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.body || !req?.usuario?.idDisciplinaClub || !req.params?.idPartidoFutbol || isNaN(Number(req.params.idPartidoFutbol))) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await ActualizarPartidoFutbolActual(req.usuario.idDisciplinaClub, parseInt(req.params.idPartidoFutbol), req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaBorrarPartidoFutbolActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.body || !req?.usuario?.idDisciplinaClub || !req.params?.idPartidoFutbol || isNaN(Number(req.params.idPartidoFutbol))) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await BorrarPartidoFutbolActual(req.usuario.idDisciplinaClub, parseInt(req.params.idPartidoFutbol), req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
