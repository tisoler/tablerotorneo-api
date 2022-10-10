import { ObtenerTorneoActualBD, TorneoBD } from "../baseDatos/torneo"

export const ObtenerTorneoActual = async (idDisciplinaClub: number): Promise<TorneoBD | null> => {
  const resultado: TorneoBD[] = await ObtenerTorneoActualBD(idDisciplinaClub)
  if (!resultado?.length) {
    console.log('No hay torneo actual para la disciplina y club.')
    return null
  }

  let torneoBD = resultado[0]

  return torneoBD
}
