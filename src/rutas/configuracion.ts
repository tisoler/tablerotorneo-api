import { Request, Response } from 'express'
import { ActualizarConfiguracion, ObtenerConfiguracion } from "../manejadores/configuracion"
import { RequestConUsuario } from '../middlewares/verifcarToken'


export const RutaObtenerConfiguracion = async (req: Request, res: Response)=>{
  try {
    if (!req.params?.idDisciplinaClub || isNaN(Number(req.params.idDisciplinaClub))) {
      res.sendStatus(400)
      return
    }
    const configuracion = await ObtenerConfiguracion(parseInt(req.params.idDisciplinaClub))
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaActualizarConfiguracion = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.usuario?.idDisciplinaClub || !req?.body) {
      res.sendStatus(400)
      return
    }
    const configuracion = await ActualizarConfiguracion(req.usuario.idDisciplinaClub, req.body)
    res.status(200).json(configuracion)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
