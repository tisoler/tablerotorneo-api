import { ActualizarConfiguracionBD, ConfiguracionDB, ObtenerConfiguracionBD, PayloadConfiguracion } from "../baseDatos/configuracion"

export const ObtenerConfiguracion = async (idDisciplinaClub: number): Promise<ConfiguracionDB> => {
  const resultado: ConfiguracionDB[] = await ObtenerConfiguracionBD(idDisciplinaClub)
  if (!resultado?.length) throw new Error('No hay configuraión.')

  let configuracionDB = resultado[0]

  return configuracionDB
}

export const ActualizarConfiguracion = async (idDisciplinaClub: number, payload: PayloadConfiguracion): Promise<ConfiguracionDB> => {
  await ActualizarConfiguracionBD(idDisciplinaClub, payload)

  return await ObtenerConfiguracion(idDisciplinaClub)
}
