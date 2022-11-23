import ConexionBaseDatos from './db'
import { EquipoDB } from './equipo'

export interface PartidoTenisPadelBD {
  id: number,
  idEquipo1: number,
  idEquipo2: number,
  equipo1Game: number,
  equipo2Game: number,
  equipo1Set1: number,
  equipo1Set2: number,
  equipo1Set3: number,
  equipo2Set1: number,
  equipo2Set2: number,
  equipo2Set3: number,
  setActual: number,
  tipoSet: 'set' | 'tie-break',
  sacaEquipo1: boolean,
  tipoGame: 'game' | 'tie-break',
  activo: boolean,
}

export type PartidoTenisPadelBDConEquipos = PartidoTenisPadelBD & {
  equipo1: EquipoDB,
  equipo2: EquipoDB,
}

export interface PayloadPartidoTenisPadel {
  [clave: string]: number,
}

export const ObtenerPartidoTenisPadelActualBD = async (idTorneo: number): Promise<PartidoTenisPadelBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT ptp.* FROM partidoTenisPadel ptp
      INNER JOIN torneoDisciplinaClub tdc ON tdc.id = ptp.idTorneoDisciplinaClub
      WHERE tdc.id = ${idTorneo} AND tdc.activo = 1 AND ptp.activo = 1
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject(`Error obteniendo partido actual para el torneo ${idTorneo}.`)
      }
      return resolve(elements)
    })
  })
}

export const ObtenerPartidosTenisPadelParaTorneoBD = async (idTorneo: number): Promise<PartidoTenisPadelBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT ptp.* FROM partidoTenisPadel ptp
      INNER JOIN torneoDisciplinaClub tdc ON tdc.id = ptp.idTorneoDisciplinaClub
      WHERE tdc.id = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject(`Error obteniendo partidos para el torneo ${idTorneo}`)
      }
      return resolve(elements)
    })
  })
}

export const CrearPartidoTenisPadelBD = async (idTorneo: number, payload: PayloadPartidoTenisPadel): Promise<PartidoTenisPadelBD[]> => {
  return new Promise((resolve, reject)=> {
    // Existente
    if (payload.id > 0) return reject('Partido de tenis/pádel existente')

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    // Validar torneo activo
    poolConexion.query(
      `SELECT id FROM torneoDisciplinaClub WHERE id = ${idTorneo} and activo = 1`, 
    (error: any, elements: any)=> {
      if (error){
        return reject(error)
      }
      
      if (!elements?.length) return reject('No hay torneos activos para esta disciplina y club.')
        
      // Remover el campo id
      delete payload.id
      // Activar partido
      payload.activo = 1

      const campos = Object.keys(payload)?.map(
        (campo: string) => campo
      )
      const valores = Object.keys(payload)?.map(
        (campo: string) => campo !== 'tipoSet' && campo !== 'tipoGame' ? payload[campo] : `'${payload[campo]}'`
      )

      // Agregar idTorneoDisciplinaClub
      campos.push('idTorneoDisciplinaClub')
      valores.push(idTorneo)

      poolConexion.query(`INSERT INTO partidoTenisPadel (${campos.join(',')}) VALUES(${valores.join(', ')})`, (error: any, elements: any)=> {
        if (error){
          console.log(error)
          return reject('Error creando partido de tenis/pádel')
        }
        return resolve(elements)
      })
    })
  })
}

export const ActualizarPartidoTenisPadelBD = async (idTorneo: number, idPartidoTenisPadel: number, payload: PayloadPartidoTenisPadel): Promise<PartidoTenisPadelBD[]> => {
  return new Promise((resolve, reject)=> {
    if (idPartidoTenisPadel <= 0) return reject('Partido de fútbol no existente')

    if (payload.golesEquipoLocal < 0 || payload.golesEquipoVisitante < 0) return

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => campo !== 'tipoSet' && campo !== 'tipoGame' ? `${campo} = ${payload[campo]}` : `${campo} = '${payload[campo]}'`
    )

    // Validamos acceso con idTorneo
    poolConexion.query(`
      UPDATE partidoTenisPadel
      SET ${camposActualizar.join(', ')}
      WHERE id = ${idPartidoTenisPadel} AND idTorneoDisciplinaClub = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error actualizando partido de tenis/pádel')
      }
      return resolve(elements)
    })
  })
}

export const BorrarPartidoTenisPadelBD = async (idTorneo: number, idPartidoTenisPadel: number, payload: PayloadPartidoTenisPadel): Promise<PartidoTenisPadelBD[]> => {
  return new Promise((resolve, reject)=> {
    if (idPartidoTenisPadel <= 0) return reject('Partido de tenis/pádel no existente')

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    // Validamos acceso con idTorneo
    poolConexion.query(`
      DELETE * FROM partidoTenisPadel
      WHERE id = ${idPartidoTenisPadel} AND idTorneoDisciplinaClub = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error eliminando partido de tenis/pádel')
      }
      return resolve(elements)
    })
  })
}
