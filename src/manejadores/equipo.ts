import { ObtenerEquiposBD, EquipoDB } from '../baseDatos/equipo'

export const ObtenerEquipos = async () => {
  const equipos: EquipoDB[] = await ObtenerEquiposBD()
  if (!equipos?.length) throw new Error('No hay equipos.')

  return equipos
}
