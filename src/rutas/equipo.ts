import { Request, Response } from 'express'
import { ActualizarEquipo, ObtenerEquipos } from '../manejadores/equipo'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerEquipos = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.params?.idDisciplinaClub && !req?.usuario?.idDisciplinaClub || req.params?.idDisciplinaClub && isNaN(Number(req.params.idDisciplinaClub))) {
      res.sendStatus(400)
      return
    }
    const idDisciplinaClub = req.params?.idDisciplinaClub ? parseInt(req.params.idDisciplinaClub) : req?.usuario?.idDisciplinaClub
    const equipos = await ObtenerEquipos(idDisciplinaClub || -1)
    res.status(200).json(equipos)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarEquipo = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.params?.idEquipo || !req?.usuario?.idDisciplinaClub || !req?.body) {
      res.sendStatus(400)
      return
    }
    const configuracion = await ActualizarEquipo(req.usuario.idDisciplinaClub, parseInt(req.params.idEquipo), req.body)
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
