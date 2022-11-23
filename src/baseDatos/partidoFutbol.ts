import ConexionBaseDatos from './db'
import { EquipoDB } from './equipo'

export interface PayloadPartidoActual {
  [clave: string]: number,
}

export interface PartidoFutbolBD {
  id: number,
  idEquipoLocal: number,
  idEquipoVisitante: number,
  golesEquipoLocal: number,
  golesEquipoVisitante: number,
  inicioPrimerTiempo: string,
  inicioSegundoTiempo: string,
  numeroTiempo: number,
  idTorneoDisciplinaClub: number,
  activo: boolean,
}

export type PartidoFutbolBDConEquipos = PartidoFutbolBD & {
  equipoLocal: EquipoDB,
  equipoVisitante: EquipoDB,
  minutosPrimerTiempo?: number,
  minutosSegundoTiempo?: number,
}

export const ObtenerPartidoFutbolActualBD = async (idTorneo: number): Promise<PartidoFutbolBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT pf.* FROM torneoDisciplinaClub as tdc
      INNER JOIN partidoFutbol as pf ON pf.idTorneoDisciplinaClub = tdc.id
      WHERE tdc.id = ${idTorneo} AND tdc.activo = 1 AND pf.activo = 1
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo partido fútbol actual')
      }
      return resolve(elements)
    })
  })
}

export const CrearPartidoFutbolActualBD = async (idTorneo: number, payload: PayloadPartidoActual): Promise<PartidoFutbolBD[]> => {
  return new Promise((resolve, reject)=> {
    // Existente
    if (payload.id > 0) return reject('Partido de fútbol existente')

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
      const idTorneoDisciplinaClub = elements[0]?.id
        
      // Remover el campo id
      delete payload.id
      // Activar partido
      payload.activo = 1

      const campos = Object.keys(payload)?.map(
        (campo: string) => campo
      )
      const valores = Object.keys(payload)?.map(
        (campo: string) => ['inicioPrimerTiempo', 'inicioSegundoTiempo'].includes(campo) ? `'${payload[campo]}'` : payload[campo]
      )

      // Agregar idTorneoDisciplinaClub
      campos.push('idTorneoDisciplinaClub')
      valores.push(idTorneoDisciplinaClub)

      poolConexion.query(`INSERT INTO partidoFutbol (${campos.join(',')}) VALUES(${valores.join(', ')})`, (error: any, elements: any)=> {
        if (error){
          console.log(error)
          return reject('Error creando partido fútbol actual')
        }
        return resolve(elements)
      })
    })
  })
}

export const ActualizarPartidoFutbolActualBD = async (idTorneo: number, idPartidoFutbol: number, payload: PayloadPartidoActual): Promise<PartidoFutbolBD[]> => {
  return new Promise((resolve, reject)=> {
    if (idPartidoFutbol <= 0) return reject('Partido de fútbol no existente')

    if (payload.golesEquipoLocal < 0 || payload.golesEquipoVisitante < 0) return

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => ['inicioPrimerTiempo', 'inicioSegundoTiempo'].includes(campo) ? `pf.${campo} = '${payload[campo]}'` : `pf.${campo} = ${payload[campo]}`
    )

    // Validamos acceso con idTorneo
    poolConexion.query(`
      UPDATE partidoFutbol as pf
      INNER JOIN torneoDisciplinaClub as tdc ON tdc.id = pf.idTorneoDisciplinaClub
      SET ${camposActualizar.join(', ')}
      WHERE pf.id = ${idPartidoFutbol} AND tdc.id = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error actualizando partido fútbol actual')
      }
      return resolve(elements)
    })
  })
}

export const BorrarPartidoFutbolActualBD = async (idTorneo: number, idPartidoFutbol: number, payload: PayloadPartidoActual): Promise<PartidoFutbolBD[]> => {
  return new Promise((resolve, reject)=> {
    if (idPartidoFutbol <= 0) return reject('Partido de fútbol no existente')

    if (payload.golesEquipoLocal < 0 || payload.golesEquipoVisitante < 0) return

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    // Validamos acceso con idTorneo
    poolConexion.query(`
      DELETE pf.* FROM partidoFutbol as pf
      INNER JOIN torneoDisciplinaClub as tdc ON tdc.id = pf.idTorneoDisciplinaClub
      WHERE pf.id = ${idPartidoFutbol} AND tdc.id = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error eliminando partido fútbol actual')
      }
      return resolve(elements)
    })
  })
}
