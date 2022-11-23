import { Request, Response } from 'express'
import { Autenticar, RegistrarUsuario } from '../manejadores/usuario'

export const RutaRegistrarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await RegistrarUsuario(req.body)
    res.status(200).json(usuario)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaAutenticar = async (req: Request, res: Response) => {
  try {
    const resp = await Autenticar(req.body)

    if (resp) res.status(200).json(resp)
    else res.status(400).json(resp)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
