import {
  ActualizarPartidoTenisPadelBD,
  BorrarPartidoTenisPadelBD,
  CrearPartidoTenisPadelBD,
  ObtenerPartidosTenisPadelParaTorneoBD,
  ObtenerPartidoTenisPadelActualBD,
  PartidoTenisPadelBD,
  PartidoTenisPadelBDConEquipos,
  PayloadPartidoTenisPadel,
} from '../baseDatos/partidoTenisPadel'
import { ObtenerEquipoBD, EquipoDB } from '../baseDatos/equipo'

export const ObtenerPartidoTenisPadelActual = async (idTorneo: number): Promise<PartidoTenisPadelBDConEquipos | null> => {
  const resultado: PartidoTenisPadelBD[] = await ObtenerPartidoTenisPadelActualBD(idTorneo)
  if (!resultado?.length) {
    console.log(`No hay partido de tenis/pádel actual para el torneo ${idTorneo}`)
    return null
  }

  let partidoTenisPadelBD = resultado[0]

  const resultadoEquipo1: EquipoDB[] = await ObtenerEquipoBD(partidoTenisPadelBD.idEquipo1)
  const resultadoEquipo2: EquipoDB[] = await ObtenerEquipoBD(partidoTenisPadelBD.idEquipo2)

  if (!resultadoEquipo1?.length || !resultadoEquipo2?.length) throw new Error('No hay equipo 1 ó 2 en el partido actual.')

  const partidoTenisPadel = {
    ...partidoTenisPadelBD,
    equipo1: resultadoEquipo1[0],
    equipo2: resultadoEquipo2[0],
  }

  return partidoTenisPadel
}

export const ObtenerPartidosTenisPadelParaTorneo = async (idTorneo: number): Promise<PartidoTenisPadelBDConEquipos[] | null> => {
  const resultado: PartidoTenisPadelBD[] = await ObtenerPartidosTenisPadelParaTorneoBD(idTorneo)
  if (!resultado?.length) {
    console.log(`No hay partidos de tenis/pádel para el torneo ${idTorneo}`)
    return null
  }

  const partidosTenisPadel: PartidoTenisPadelBDConEquipos[] = await Promise.all(resultado.map(async (partidoTenisPadelBD) => {
      const resultadoEquipo1: EquipoDB[] = await ObtenerEquipoBD(partidoTenisPadelBD.idEquipo1)
      const resultadoEquipo2: EquipoDB[] = await ObtenerEquipoBD(partidoTenisPadelBD.idEquipo2)

      if (!resultadoEquipo1?.length || !resultadoEquipo2?.length) throw new Error(`No hay equipo 1 ó 2 en el partido ${partidoTenisPadelBD.id}.`)

      const partidoTenisPadel = {
        ...partidoTenisPadelBD,
        equipo1: resultadoEquipo1[0],
        equipo2: resultadoEquipo2[0],
      }

      return partidoTenisPadel
    })
  )

  return partidosTenisPadel
}

export const CrearPartidoTenisPadel = async (idTorneo: number, payload: PayloadPartidoTenisPadel): Promise<PartidoTenisPadelBDConEquipos | null> => {
  const actualizacion: PartidoTenisPadelBD[] = await CrearPartidoTenisPadelBD(idTorneo, payload)
  
  return await ObtenerPartidoTenisPadelActual(idTorneo)
}

export const ActualizarPartidoTenisPadel = async (idTorneo: number, idPartidoTenisPadel: number, payload: PayloadPartidoTenisPadel): Promise<PartidoTenisPadelBDConEquipos | null> => {
  const actualizacion: PartidoTenisPadelBD[] = await ActualizarPartidoTenisPadelBD(idTorneo, idPartidoTenisPadel, payload)
  
  return await ObtenerPartidoTenisPadelActual(idTorneo)
}

export const BorrarPartidoTenisPadel = async (idTorneo: number, idPartidoTenisPadel: number, payload: PayloadPartidoTenisPadel): Promise<PartidoTenisPadelBDConEquipos | null> => {
  const actualizacion: PartidoTenisPadelBD[] = await BorrarPartidoTenisPadelBD(idTorneo, idPartidoTenisPadel, payload)
  
  return null
}

const procesarTieBreak = (puntajeActual: number, partidoTenisPadel: PartidoTenisPadelBDConEquipos, esEquipo1: boolean, suma: boolean) => {
  let puntajeGame = puntajeActual + (suma ? 1 : (puntajeActual > 0 ? -1 : 0))
  const puntajeEquipo1 = esEquipo1 ? puntajeGame : partidoTenisPadel.equipo1Game
  const puntajeEquipo2 = !esEquipo1 ? puntajeGame : partidoTenisPadel.equipo2Game

  let payloadGame = {}
  let termino = false
  switch (partidoTenisPadel.setActual) {
    case 2:
      if ((puntajeEquipo1 >= 15 || puntajeEquipo2 >= 15) || ((puntajeEquipo1 >= 7 || puntajeEquipo2 >= 7) && Math.abs(puntajeEquipo1 - puntajeEquipo2) >= 2)) {
        payloadGame = puntajeEquipo1 > puntajeEquipo2 ? { equipo1Set2: partidoTenisPadel.equipo1Set2 + 1 } : { equipo2Set2: partidoTenisPadel.equipo2Set2 + 1 }
        payloadGame = {...payloadGame, setActual: partidoTenisPadel.setActual + 1, ...(esEquipo1 ? { equipo2Game: 0 } : {equipo1Game: 0})}
        puntajeGame = 0
        termino = true
      }
      break
    case 3:
      if ((puntajeEquipo1 >= 15 || puntajeEquipo2 >= 15) || ((puntajeEquipo1 >= 11 || puntajeEquipo2 >= 11) && Math.abs(puntajeEquipo1 - puntajeEquipo2) >= 2)) {
        payloadGame = puntajeEquipo1 > puntajeEquipo2 ? { equipo1Set3: partidoTenisPadel.equipo1Set3 + 1 } : { equipo2Set3: partidoTenisPadel.equipo2Set3 + 1 }
        payloadGame = {...payloadGame, ...(esEquipo1 ? { equipo2Game: 0 } : {equipo1Game: 0})}
        puntajeGame = 0
        termino = true
      }
      break
    default:
      if ((puntajeEquipo1 >= 15 || puntajeEquipo2 >= 15) || ((puntajeEquipo1 >= 7 || puntajeEquipo2 >= 7) && Math.abs(puntajeEquipo1 - puntajeEquipo2) >= 2)) {
        payloadGame = puntajeEquipo1 > puntajeEquipo2 ? { equipo1Set1: partidoTenisPadel.equipo1Set1 + 1 } : { equipo2Set1: partidoTenisPadel.equipo2Set1 + 1 }
        payloadGame = {...payloadGame, setActual: partidoTenisPadel.setActual + 1, ...(esEquipo1 ? { equipo2Game: 0 } : {equipo1Game: 0})}
        puntajeGame = 0
        termino = true
      }
      break
  }

  // cambio de saque
  if ((puntajeEquipo1 + puntajeEquipo2) % 2 > 0 || termino) payloadGame = {...payloadGame, sacaEquipo1: partidoTenisPadel.sacaEquipo1 ? !partidoTenisPadel.sacaEquipo1 : true}

  return {
    payloadGame,
    puntajeGame,
  }
}

const game = (partidoTenisPadel: PartidoTenisPadelBDConEquipos, esEquipo1: boolean) => {
  let payloadGame = {}
  switch (partidoTenisPadel.setActual) {
    case 2:
      payloadGame = esEquipo1 ? { equipo1Set2: partidoTenisPadel.equipo1Set2 + 1 } : { equipo2Set2: partidoTenisPadel.equipo2Set2 + 1 }
      break
    case 3:
      payloadGame = esEquipo1 ? { equipo1Set3: partidoTenisPadel.equipo1Set3 + 1 } : { equipo2Set3: partidoTenisPadel.equipo2Set3 + 1 }
      break
    default:
      payloadGame = esEquipo1 ? { equipo1Set1: partidoTenisPadel.equipo1Set1 + 1 } : { equipo2Set1: partidoTenisPadel.equipo2Set1 + 1 }
      break
  }

  // validar si cambiar set
  let gamesEnSetEquipo1 = 0
  let gamesEnSetEquipo2 = 0
  if (partidoTenisPadel.setActual === 1) {
    gamesEnSetEquipo1 = partidoTenisPadel.equipo1Set1 + (esEquipo1 ? 1 : 0)
    gamesEnSetEquipo2 = partidoTenisPadel.equipo2Set1 + (esEquipo1 ? 0 : 1)
    if ((gamesEnSetEquipo1 >= 6 || gamesEnSetEquipo2 >= 6) && Math.abs(gamesEnSetEquipo1 - gamesEnSetEquipo2) >= 2) {
      payloadGame = { ...payloadGame, setActual: partidoTenisPadel.setActual + 1 }
    }
  } else if (partidoTenisPadel.setActual === 2) {
    gamesEnSetEquipo1 = partidoTenisPadel.equipo1Set2 + (esEquipo1 ? 1 : 0)
    gamesEnSetEquipo2 = partidoTenisPadel.equipo2Set2 + (esEquipo1 ? 0 : 1)
    if ((gamesEnSetEquipo1 >= 6 || gamesEnSetEquipo2 >= 6) && Math.abs(gamesEnSetEquipo1 - gamesEnSetEquipo2) >= 2) {
      payloadGame = { ...payloadGame, setActual: partidoTenisPadel.setActual + 1, tipoSet: 'tie-break' }
    }
  }

  const cambioSaque = { sacaEquipo1: partidoTenisPadel?.sacaEquipo1 ? !partidoTenisPadel.sacaEquipo1 : true }

  return {
    ...payloadGame,
    ...(!esEquipo1 ? { equipo1Game: 0 } : { equipo2Game: 0 }),
    ...cambioSaque,
  }
}

const obtenerPayloadActualizacion = async (idTorneo: number, suma: boolean, esEquipo1: boolean) => {
  let puntaje = 0
  const partidoTenisPadel = await ObtenerPartidoTenisPadelActual(idTorneo)
  if (!partidoTenisPadel) throw new Error('No hay partido de tenis/pádel actual.')
  const puntajeActual = esEquipo1 ? partidoTenisPadel.equipo1Game : partidoTenisPadel.equipo2Game
  const puntajeActualOtroEquipo = !esEquipo1 ? partidoTenisPadel.equipo1Game : partidoTenisPadel.equipo2Game

  let payload = {}

  switch (partidoTenisPadel.tipoGame) {
    case 'tie-break':
      const { puntajeGame, payloadGame } = procesarTieBreak(puntajeActual, partidoTenisPadel, esEquipo1, suma)
      puntaje = puntajeGame
      payload = payloadGame
      break
    default: 
      switch (puntajeActual) {
        case 15:
          puntaje = suma ? 30 : 0
          break
        case 30:
          puntaje = suma ? 40 : 15
          break
        case 40:
          if (!suma) puntaje = 30
          else {
            if (puntajeActualOtroEquipo > 40) { // iguales
              payload = !esEquipo1 ? { equipo1Game: 40 } : { equipo2Game: 40 }
              puntaje = 40
            }
            else if (puntajeActualOtroEquipo === 40) puntaje = 50 // ventaja
            else {
              puntaje = 0 // game
              payload = game(partidoTenisPadel, esEquipo1)
            }
          }
          break
        case 50: // game
          if (suma) {
            puntaje = 0
            payload = game(partidoTenisPadel, esEquipo1)
          } else {
            puntaje = 40
          }
          break
        default: // 0
          puntaje = suma ? 15 : 0
          break
      }
      break
  }

  return {
    ...payload,
    ...(esEquipo1 ? { equipo1Game: puntaje } : { equipo2Game: puntaje })
  }
}

export const ActualizarGame = async (idTorneo: number, idPartidoTenisPadel: number, payload: { suma: boolean, esEquipo1: boolean }): Promise<PartidoTenisPadelBDConEquipos | null> => {
  const { suma, esEquipo1 } = payload

  const payloadActualizar = await obtenerPayloadActualizacion(idTorneo, suma, esEquipo1)

  return await ActualizarPartidoTenisPadel(idTorneo, idPartidoTenisPadel, payloadActualizar)
}
