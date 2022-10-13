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

  const ahora = new Date()
  const minutosPrimerCuarto = partidoActualDB.inicioPrimerCuarto
    ? Math.trunc(Math.abs((ahora.getTime() - new Date(`${partidoActualDB.inicioPrimerCuarto.replace(' ', 'T')}Z`).getTime()) / 60000))
    : 0
  const minutosSegundoCuarto = partidoActualDB.inicioSegundoCuarto
    ? Math.trunc(Math.abs((ahora.getTime() - new Date(`${partidoActualDB.inicioSegundoCuarto.replace(' ', 'T')}Z`).getTime()) / 60000))
    : 0
  const minutosTercerCuarto = partidoActualDB.inicioTercerCuarto
    ? Math.trunc(Math.abs((ahora.getTime() - new Date(`${partidoActualDB.inicioTercerCuarto.replace(' ', 'T')}Z`).getTime()) / 60000))
    : 0
  const minutosCuartoCuarto = partidoActualDB.inicioCuartoCuarto
    ? Math.trunc(Math.abs((ahora.getTime() - new Date(`${partidoActualDB.inicioCuartoCuarto.replace(' ', 'T')}Z`).getTime()) / 60000))
    : 0

  const partidoHockeyActual = {
    ...partidoActualDB,
    equipoLocal: resultadoEquipoLocal[0],
    equipoVisitante: resultadoEquipoVisitante[0],
    minutosPrimerCuarto,
    minutosSegundoCuarto,
    minutosTercerCuarto,
    minutosCuartoCuarto,
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
