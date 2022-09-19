import { ActualizarConfiguracionBD, ConfiguracionDB, ObtenerConfiguracionBD, PayloadConfiguracion } from "../baseDatos/configuracion"

export const ObtenerConfiguracion = async (): Promise<ConfiguracionDB> => {
  const resultado: ConfiguracionDB[] = await ObtenerConfiguracionBD()
  if (!resultado?.length) throw new Error('No hay configuraión.')

  let configuracionDB = resultado[0]

  return configuracionDB
}

export const ActualizarConfiguracion = async (payload: PayloadConfiguracion): Promise<ConfiguracionDB> => {
  await ActualizarConfiguracionBD(payload)

  return await ObtenerConfiguracion()
}
