import { Request, Response } from 'express'
import { Autenticar } from '../manejadores/autenticar'

export const RutaAutenticar = async (req: Request, res: Response)=>{
  try {
    const valido = await Autenticar(req.body)

    if (valido) res.status(200).json({ valido })
    else res.status(400).json({ valido })
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}
