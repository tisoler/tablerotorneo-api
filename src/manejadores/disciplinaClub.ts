import { DisciplinaClubBD, ObtenerDisciplinasClubesBD } from "../baseDatos/disciplinaClub"

export const ObtenerDisciplinasClubes = async () => {
  const disciplinasClubes: DisciplinaClubBD[] = await ObtenerDisciplinasClubesBD()
  if (!disciplinasClubes?.length) throw new Error('No hay disciplinas configuradas para algún club.')

  return disciplinasClubes
}
