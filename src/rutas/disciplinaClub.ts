import { Request, Response } from 'express'
import { ObtenerDisciplinasClubes } from "../manejadores/disciplinaClub"

export const RutaObtenerDisciplinasClubes = async (req: Request, res: Response) => {
  try {
    const disciplinasClubes = await ObtenerDisciplinasClubes()
    res.status(200).json(disciplinasClubes)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
