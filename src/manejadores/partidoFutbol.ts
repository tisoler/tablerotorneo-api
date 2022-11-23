import {
  ActualizarPartidoFutbolActualBD,
  BorrarPartidoFutbolActualBD,
  CrearPartidoFutbolActualBD,
  ObtenerPartidoFutbolActualBD,
  PartidoFutbolBD,
  PartidoFutbolBDConEquipos,
  PayloadPartidoActual,
} from '../baseDatos/partidoFutbol'
import { ObtenerEquipoBD, EquipoDB } from '../baseDatos/equipo'

export const ObtenerPartidoFutbolActual = async (idTorneo: number): Promise<PartidoFutbolBDConEquipos | null> => {
  const resultado: PartidoFutbolBD[] = await ObtenerPartidoFutbolActualBD(idTorneo)

  if (!resultado?.length) {
    console.log('No hay partido de fútbol actual')
    return null
  }

  let partidoActualDB = resultado[0]

  const resultadoEquipoLocal: EquipoDB[] = await ObtenerEquipoBD(partidoActualDB.idEquipoLocal)
  const resultadoEquipoVisitante: EquipoDB[] = await ObtenerEquipoBD(partidoActualDB.idEquipoVisitante)

  if (!resultadoEquipoLocal?.length || !resultadoEquipoVisitante?.length) throw new Error('No hay equipo 1 ó 2 en el partido de fútbol actual.')

  const ahora = new Date()
  const minutosPrimerTiempo = partidoActualDB.inicioPrimerTiempo
    ? Math.trunc(Math.abs((ahora.getTime() - new Date(`${partidoActualDB.inicioPrimerTiempo.replace(' ', 'T')}Z`).getTime()) / 60000))
    : 0
  const minutosSegundoTiempo = partidoActualDB.inicioSegundoTiempo
    ? Math.trunc(Math.abs((ahora.getTime() - new Date(`${partidoActualDB.inicioSegundoTiempo.replace(' ', 'T')}Z`).getTime()) / 60000))
    : 0

  const partidoFutbolActual = {
    ...partidoActualDB,
    equipoLocal: resultadoEquipoLocal[0],
    equipoVisitante: resultadoEquipoVisitante[0],
    minutosPrimerTiempo,
    minutosSegundoTiempo,
  }

  return partidoFutbolActual
}

export const CrearPartidoFutbolActual = async (idTorneo: number, payload: PayloadPartidoActual): Promise<PartidoFutbolBDConEquipos | null> => {
  const actualizacion: PartidoFutbolBD[] = await CrearPartidoFutbolActualBD(idTorneo, payload)
  
  return await ObtenerPartidoFutbolActual(idTorneo)
}

export const ActualizarPartidoFutbolActual = async (idTorneo: number, idPartidoFutbol: number, payload: PayloadPartidoActual): Promise<PartidoFutbolBDConEquipos | null> => {
  const actualizacion: PartidoFutbolBD[] = await ActualizarPartidoFutbolActualBD(idTorneo, idPartidoFutbol, payload)
  
  return await ObtenerPartidoFutbolActual(idTorneo)
}

export const BorrarPartidoFutbolActual = async (idTorneo: number, idPartidoFutbol: number, payload: PayloadPartidoActual): Promise<PartidoFutbolBDConEquipos | null> => {
  const actualizacion: PartidoFutbolBD[] = await BorrarPartidoFutbolActualBD(idTorneo, idPartidoFutbol, payload)
  
  return null
}
