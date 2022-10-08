import { AutenticarBD, RegistrarUsuarioBD, UsuarioResp } from '../baseDatos/usuario'

export const RegistrarUsuario = async (payload: { usuario: string, clave: string }): Promise<{ id: number }> => {
  const idUsuario: number = await RegistrarUsuarioBD(payload.usuario, payload.clave)
  return { id: idUsuario }
}

export const Autenticar = async (payload: { usuario: string, clave: string }): Promise<UsuarioResp> => {
  const { usuario, clave } = payload
  if (!usuario || !clave) throw new Error('No se enviaron usuario y/o clave.')

  return await AutenticarBD(usuario, clave)
}
