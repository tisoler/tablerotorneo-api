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

export const ObtenerPartidoHockeyActual = async (idTorneo: number): Promise<PartidoHockeyBDConEquipos | null> => {
  const resultado: PartidoHockeyBD[] = await ObtenerPartidoHockeyActualBD(idTorneo)
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

export const CrearPartidoHockeyActual = async (idTorneo: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBDConEquipos | null> => {
  const actualizacion: PartidoHockeyBD[] = await CrearPartidoHockeyActualBD(idTorneo, payload)
  
  return await ObtenerPartidoHockeyActual(idTorneo)
}

export const ActualizarPartidoHockeyActual = async (idTorneo: number, idPartidoHockey: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBDConEquipos | null> => {
  const actualizacion: PartidoHockeyBD[] = await ActualizarPartidoHockeyActualBD(idTorneo, idPartidoHockey, payload)
  
  return await ObtenerPartidoHockeyActual(idTorneo)
}

export const BorrarPartidoHockeyActual = async (idTorneo: number, idPartidoHockey: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBDConEquipos | null> => {
  const actualizacion: PartidoHockeyBD[] = await BorrarPartidoHockeyActualBD(idTorneo, idPartidoHockey, payload)
  
  return null
}
