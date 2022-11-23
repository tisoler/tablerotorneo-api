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
  inicioPrimerCuarto: string,
  inicioSegundoCuarto: string,
  inicioTercerCuarto: string,
  inicioCuartoCuarto: string,
  numeroCuarto: number,
  idTorneoDisciplinaClub: number,
  activo: boolean,
}

export type PartidoHockeyBDConEquipos = PartidoHockeyBD & {
  equipoLocal: EquipoDB,
  equipoVisitante: EquipoDB,
  minutosPrimerCuarto?: number,
  minutosSegundoCuarto?: number,
  minutosTercerCuarto?: number,
  minutosCuartoCuarto?: number,
}

export const ObtenerPartidoHockeyActualBD = async (idTorneo: number): Promise<PartidoHockeyBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT ph.* FROM torneoDisciplinaClub as tdc
      INNER JOIN partidoHockey as ph ON ph.idTorneoDisciplinaClub = tdc.id 
      WHERE tdc.id = ${idTorneo} AND tdc.activo = 1 AND ph.activo = 1
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo partido hockey actual')
      }
      return resolve(elements)
    })
  })
}

export const CrearPartidoHockeyActualBD = async (idTorneo: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBD[]> => {
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
        console.log(error)
        return reject('Error obteniendo torneo disciplina club')
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
        (campo: string) => ['inicioPrimerCuarto', 'inicioSegundoCuarto', 'inicioTercerCuarto', 'inicioCuartoCuarto'].includes(campo) ? `'${payload[campo]}'` : payload[campo]
      )

      // Agregar idTorneoDisciplinaClub
      campos.push('idTorneoDisciplinaClub')
      valores.push(idTorneoDisciplinaClub)

      poolConexion.query(`INSERT INTO partidoHockey (${campos.join(',')}) VALUES(${valores.join(', ')})`, (error: any, elements: any)=> {
        if (error){
          console.log(error)
          return reject('Error creando partido hockey actual')
        }
        return resolve(elements)
      })
    })
  })
}

export const ActualizarPartidoHockeyActualBD = async (idTorneo: number, idPartidoHockey: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBD[]> => {
  return new Promise((resolve, reject)=> {
    if (idPartidoHockey <= 0) return reject('Partido de fútbol no existente')

    if (payload.golesEquipoLocal < 0 || payload.golesEquipoVisitante < 0) return

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => ['inicioPrimerCuarto', 'inicioSegundoCuarto', 'inicioTercerCuarto', 'inicioCuartoCuarto'].includes(campo) ? `ph.${campo} = '${payload[campo]}'` : `ph.${campo} = ${payload[campo]}`
    )

    // Validamos acceso con idTorneo
    poolConexion.query(`
      UPDATE partidoHockey as ph
      INNER JOIN torneoDisciplinaClub as tdc ON tdc.id = ph.idTorneoDisciplinaClub
      SET ${camposActualizar.join(', ')}
      WHERE ph.id = ${idPartidoHockey} AND tdc.id = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error actualizando partido hockey actual')
      }
      return resolve(elements)
    })
  })
}

export const BorrarPartidoHockeyActualBD = async (idTorneo: number, idPartidoHockey: number, payload: PayloadPartidoActual): Promise<PartidoHockeyBD[]> => {
  return new Promise((resolve, reject)=> {
    if (idPartidoHockey <= 0) return reject('Partido de fútbol no existente')

    if (payload.golesEquipoLocal < 0 || payload.golesEquipoVisitante < 0) return

    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    // Validamos acceso con idTorneo
    poolConexion.query(`
      DELETE ph.* FROM partidoHockey as ph
      INNER JOIN torneoDisciplinaClub as tdc ON tdc.id = ph.idTorneoDisciplinaClub
      WHERE ph.id = ${idPartidoHockey} AND tdc.id = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error eliminando partido hockey actual')
      }
      return resolve(elements)
    })
  })
}
