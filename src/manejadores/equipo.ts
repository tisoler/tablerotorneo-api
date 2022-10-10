import { ObtenerEquiposBD, EquipoDB, ActualizarEquipoBD, PayloadEquipo } from '../baseDatos/equipo'

export const ObtenerEquipos = async (idDisciplinaClub: number) => {
  const equipos: EquipoDB[] = await ObtenerEquiposBD(idDisciplinaClub)
  if (!equipos?.length) throw new Error('No hay equipos.')

  return equipos
}

export const ActualizarEquipo = async (idDisciplinaClub: number, idEquipo: number, payload: PayloadEquipo): Promise<EquipoDB[]> => {
  await ActualizarEquipoBD(idEquipo, payload)

  return await ObtenerEquipos(idDisciplinaClub)
}
