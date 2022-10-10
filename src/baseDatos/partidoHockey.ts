import ConexionBaseDatos from './db'
import { EquipoDB } from './equipo'

export interface PayloadPartidoActual {
  [clave: string]: number,
}

export interface PartidoHockeyBD {
  id: number,
  idEquipoLocal: number,
  idEquipoVisitante: number,
  golesEquipoLocal: number,
  golesEquipoVisitante: number,
  fecha: Date,
  numeroTiempo: number,
  idTorneoDisciplinaClub: number,
  activo: boolean,
}

export type PartidoHockeyBDConEquipos = PartidoHockeyBD & {
  equipoLocal: EquipoDB,
  equipoVisitante: EquipoDB,
}

export const ObtenerPartidoHockeyActualBD = async (idDisciplinaClub: number): Promise<PartidoHockeyBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT ph.* FROM torneoDisciplinaClub as tdc
      INNER JOIN partidoHockey as ph ON ph.idTorneoDisciplinaClub = tdc.id 
      WHERE tdc.idDisciplinaClub = ${idDisciplinaClub} AND tdc.activo = 1 AND ph.activo = 1
    `, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

export const CrearPartidoHockeyActualBD = async (idDisciplinaClub: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBD[]> => {
  return new Promise((resolve, reject)=> {
    // Existente
    if (payload.id > 0) return reject('Partido de fútbol existente')

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    // Obtener idTorneoDisciplinaClub
    poolConexion.query(
      `SELECT id FROM torneoDisciplinaClub WHERE idDisciplinaClub = ${idDisciplinaClub} and activo = 1`, 
    (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      
      if(!elements?.length) return reject('No hay torneos activos para esta disciplina y club.')
      const idTorneoDisciplinaClub = elements[0]?.id
        
      // Remover el campo id
      delete payload.id
      // Activar partido
      payload.activo = 1

      const campos = Object.keys(payload)?.map(
        (campo: string) => campo
      )
      const valores = Object.keys(payload)?.map(
        (campo: string) => payload[campo]
      )

      // Agregar idTorneoDisciplinaClub
      campos.push('idTorneoDisciplinaClub')
      valores.push(idTorneoDisciplinaClub)

      poolConexion.query(`INSERT INTO partidoHockey (${campos.join(',')}) VALUES(${valores.join(', ')})`, (error: any, elements: any)=> {
        if(error){
          return reject(error)
        }
        return resolve(elements)
      })
    })
  })
}

export const ActualizarPartidoHockeyActualBD = async (idDisciplinaClub: number, idPartidoHockey: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBD[]> => {
  return new Promise((resolve, reject)=> {
    if (idPartidoHockey <= 0) return reject('Partido de fútbol no existente')

    if (payload.golesEquipoLocal < 0 || payload.golesEquipoVisitante < 0) return

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => `ph.${campo} = ${payload[campo]}`
    )

    // Validamos acceso con idDisciplinaClub
    poolConexion.query(`
      UPDATE partidoHockey as ph
      INNER JOIN torneoDisciplinaClub as tdc ON tdc.id = ph.idTorneoDisciplinaClub
      SET ${camposActualizar.join(', ')}
      WHERE ph.id = ${idPartidoHockey} AND tdc.idDisciplinaClub = ${idDisciplinaClub}
    `, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

export const BorrarPartidoHockeyActualBD = async (idDisciplinaClub: number, idPartidoHockey: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBD[]> => {
  return new Promise((resolve, reject)=> {
    if (idPartidoHockey <= 0) return reject('Partido de fútbol no existente')

    if (payload.golesEquipoLocal < 0 || payload.golesEquipoVisitante < 0) return

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    // Validamos acceso con idDisciplinaClub
    poolConexion.query(`
      DELETE ph.* FROM partidoHockey as ph
      INNER JOIN torneoDisciplinaClub as tdc ON tdc.id = ph.idTorneoDisciplinaClub
      WHERE ph.id = ${idPartidoHockey} AND tdc.idDisciplinaClub = ${idDisciplinaClub}
    `, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}
