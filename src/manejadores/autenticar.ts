
export const Autenticar = async (payload: { usuario: string, clave: string }): Promise<boolean> => {
  const { USUARIO, CLAVE } = process.env
  const { usuario, clave } = payload

  if (!USUARIO || !CLAVE) throw new Error('No se han configurado USUARIO y/o CLAVE.')
  if (!usuario || !clave) throw new Error('No se enviaron usuario y/o clave.')

  return USUARIO === usuario && CLAVE === clave
}
  