import { Request, Response } from 'express'
import { ObtenerTorneoActual } from '../manejadores/torneo'


export const RutaObtenerTorneoActual = async (req: Request, res: Response)=>{
  try {
    if (!req.params?.idDisciplinaClub || isNaN(Number(req.params.idDisciplinaClub))) {
      res.sendStatus(400)
      return
    }
    const torneoActual = await ObtenerTorneoActual(parseInt(req.params.idDisciplinaClub))
    res.status(200).json(torneoActual)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
