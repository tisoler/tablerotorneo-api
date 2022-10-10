import {
  ActualizarPartidoHockeyActualBD,
  BorrarPartidoHockeyActualBD,
  CrearPartidoHockeyActualBD,
  ObtenerPartidoHockeyActualBD,
  PartidoHockeyBD,
  PartidoHockeyBDConEquipos,
  PayloadPartidoActual,
} from '../baseDatos/partidoHockey'
import { ObtenerEquipoBD, EquipoDB } from '../baseDatos/equipo'

export const ObtenerPartidoHockeyActual = async (idDisciplinaClub: number): Promise<PartidoHockeyBDConEquipos | null> => {
  const resultado: PartidoHockeyBD[] = await ObtenerPartidoHockeyActualBD(idDisciplinaClub)
  if (!resultado?.length) {
    console.log('No hay partido de hockey actual')
    return null
  }

  let partidoActualDB = resultado[0]

  const resultadoEquipoLocal: EquipoDB[] = await ObtenerEquipoBD(partidoActualDB.idEquipoLocal)
  const resultadoEquipoVisitante: EquipoDB[] = await ObtenerEquipoBD(partidoActualDB.idEquipoVisitante)

  if (!resultadoEquipoLocal?.length || !resultadoEquipoVisitante?.length) throw new Error('No hay equipo 1 ó 2 en el partido de fútbol actual.')

  const partidoHockeyActual = {
    ...partidoActualDB,
    equipoLocal: resultadoEquipoLocal[0],
    equipoVisitante: resultadoEquipoVisitante[0],
  }

  return partidoHockeyActual
}

export const CrearPartidoHockeyActual = async (idDisciplinaClub: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBDConEquipos | null> => {
  const actualizacion: PartidoHockeyBD[] = await CrearPartidoHockeyActualBD(idDisciplinaClub, payload)
  
  return await ObtenerPartidoHockeyActual(idDisciplinaClub)
}

export const ActualizarPartidoHockeyActual = async (idDisciplinaClub: number, idPartidoHockey: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBDConEquipos | null> => {
  const actualizacion: PartidoHockeyBD[] = await ActualizarPartidoHockeyActualBD(idDisciplinaClub, idPartidoHockey, payload)
  
  return await ObtenerPartidoHockeyActual(idDisciplinaClub)
}

export const BorrarPartidoHockeyActual = async (idDisciplinaClub: number, idPartidoHockey: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBDConEquipos | null> => {
  const actualizacion: PartidoHockeyBD[] = await BorrarPartidoHockeyActualBD(idDisciplinaClub, idPartidoHockey, payload)
  
  return null
}
