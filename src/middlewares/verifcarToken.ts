import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Acceso denegado' })
  try {
    const verificado = jwt.verify(token, process.env.TOKEN_SECRETO || '')
    // @ts-ignore
    req.usuario = verificado
    next()
  } catch (error) {
      res.status(400).json({error: 'el token no es válido'})
  }
}

export default verificarToken
