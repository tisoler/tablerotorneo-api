import { ObtenerEquiposParaTorneoBD, EquipoDB, ActualizarEquipoBD, PayloadEquipo } from '../baseDatos/equipo'

export const ObtenerEquiposParaTorneo = async (idTorneo: number): Promise<EquipoDB[]> => {
  const equipos: EquipoDB[] = await ObtenerEquiposParaTorneoBD(idTorneo)
  if (!equipos?.length) {
    console.log(`No hay equipos para el torneo ${idTorneo}.`)
    return []
  }

  return equipos
}

export const ActualizarEquipo = async (idTorneo: number, idEquipo: number, payload: PayloadEquipo): Promise<EquipoDB[]> => {
  await ActualizarEquipoBD(idTorneo, idEquipo, payload)

  return await ObtenerEquiposParaTorneo(idTorneo)
}
