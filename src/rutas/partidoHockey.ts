import { Request, Response } from 'express'
import { ObtenerPartidoHockeyActual, ActualizarPartidoHockeyActual, CrearPartidoHockeyActual, BorrarPartidoHockeyActual } from '../manejadores/partidoHockey'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerPartidoHockeyActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.params?.idDisciplinaClub && !req?.usuario?.idDisciplinaClub || req.params?.idDisciplinaClub && isNaN(Number(req.params.idDisciplinaClub))) {
      res.sendStatus(400)
      return
    }
    const idDisciplinaClub = req.params?.idDisciplinaClub ? parseInt(req.params?.idDisciplinaClub) : req?.usuario?.idDisciplinaClub
    const partidoActual = await ObtenerPartidoHockeyActual(idDisciplinaClub || -1)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCrearPartidoHockeyActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.body || !req?.usuario?.idDisciplinaClub) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await CrearPartidoHockeyActual(req.usuario.idDisciplinaClub, req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarPartidoHockeyActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.body || !req?.usuario?.idDisciplinaClub || !req.params?.idPartidoHockey || isNaN(Number(req.params.idPartidoHockey))) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await ActualizarPartidoHockeyActual(req.usuario.idDisciplinaClub, parseInt(req.params.idPartidoHockey), req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaBorrarPartidoHockeyActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.body || !req?.usuario?.idDisciplinaClub || !req.params?.idPartidoHockey || isNaN(Number(req.params.idPartidoHockey))) {
      res.sendStatus(400)
      return
    }
    const partidoActual = await BorrarPartidoHockeyActual(req.usuario.idDisciplinaClub, parseInt(req.params.idPartidoHockey), req.body)
    res.status(200).json(partidoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
