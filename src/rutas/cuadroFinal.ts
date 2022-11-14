import { Response } from 'express'
import { CrearActualizarCuadroFinal, ObtenerCuadroFinalActual } from '../manejadores/cuadroFinal'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerCuadroFinalActual = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req.params?.idDisciplinaClub && !req?.usuario?.idDisciplinaClub || req.params?.idDisciplinaClub && isNaN(Number(req.params.idDisciplinaClub))) {
      res.sendStatus(400)
      return
    }
    const idDisciplinaClub = req.params?.idDisciplinaClub ? parseInt(req.params.idDisciplinaClub) : req?.usuario?.idDisciplinaClub
    const cuadroFinal = await ObtenerCuadroFinalActual(idDisciplinaClub || -1)
    res.status(200).json(cuadroFinal)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCrearActualizarCuadroFinal = async (req: RequestConUsuario, res: Response)=>{
  try {
    if (!req?.body || !req?.usuario?.idDisciplinaClub) {
      res.sendStatus(400)
      return
    }
    const idDisciplinaClub = req.params?.idDisciplinaClub ? parseInt(req.params.idDisciplinaClub) : req?.usuario?.idDisciplinaClub
    const cuadroFinal = await CrearActualizarCuadroFinal(idDisciplinaClub || -1, req.body)
    res.status(200).json(cuadroFinal)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
