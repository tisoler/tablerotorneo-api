import { ObtenerTorneoBD, ObtenerTorneosBD, TorneoBD } from "../baseDatos/torneo"

export const ObtenerTorneoActual = async (idDisciplinaClub: number): Promise<TorneoBD | null> => {
  const torneos: TorneoBD[] = await ObtenerTorneosBD(idDisciplinaClub)
  if (!torneos?.length) {
    console.log('No hay torneo actual para la disciplina y club.')
    return null
  }

  let torneo = torneos.find(t => t.activo)
  if (!torneo) {
    console.log('No hay torneo actual para la disciplina y club.')
    return null
  }

  return torneo
}

export const ObtenerTorneos = async (idDisciplinaClub: number): Promise<TorneoBD[] | null> => {
  const torneos: TorneoBD[] = await ObtenerTorneosBD(idDisciplinaClub)
  if (!torneos?.length) {
    console.log('No hay torneos para la disciplina y club.')
    return null
  }

  return torneos
}

export const ObtenerTorneo = async (idTorneo: number): Promise<TorneoBD | null> => {
  const torneos: TorneoBD[] = await ObtenerTorneoBD(idTorneo)
  if (!torneos?.length) {
    console.log(`No hay torneo con id ${idTorneo}.`)
    return null
  }

  return torneos[0]
}
