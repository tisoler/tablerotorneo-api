import { ObtenerEquiposBD, EquipoDB, ActualizarEquipoBD, PayloadEquipo } from '../baseDatos/equipo'

export const ObtenerEquipos = async () => {
  const equipos: EquipoDB[] = await ObtenerEquiposBD()
  if (!equipos?.length) throw new Error('No hay equipos.')

  return equipos
}

export const ActualizarEquipo = async (idEquipo: number, payload: PayloadEquipo): Promise<EquipoDB[]> => {
  await ActualizarEquipoBD(idEquipo, payload)

  return await ObtenerEquipos()
}
