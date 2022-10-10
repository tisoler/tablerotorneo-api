import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UsuarioResp } from '../baseDatos/usuario'

export type RequestConUsuario = Request & { usuario?: UsuarioResp }

const verificarToken = (req: RequestConUsuario, res: Response, next: NextFunction) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Acceso denegado' })
  try {
    const verificado = jwt.verify(token, process.env.TOKEN_SECRETO || '')
    req.usuario = verificado as UsuarioResp
    next()
  } catch (error) {
      res.status(400).json({error: 'el token no es válido'})
  }
}

export default verificarToken
