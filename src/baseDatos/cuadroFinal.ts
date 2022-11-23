import ConexionBaseDatos from './db'
import { EquipoDB } from './equipo'

export interface CuadroFinalDB {
  octavosAEquipo1: number,
  octavosAEquipo2: number,
  octavosBEquipo1: number,
  octavosBEquipo2: number,
  octavosCEquipo1: number,
  octavosCEquipo2: number,
  octavosDEquipo1: number,
  octavosDEquipo2: number,
  octavosEEquipo1: number,
  octavosEEquipo2: number,
  octavosFEquipo1: number,
  octavosFEquipo2: number,
  octavosGEquipo1: number,
  octavosGEquipo2: number,
  octavosHEquipo1: number,
  octavosHEquipo2: number,
  cuartosABEquipo1: number,
  cuartosABEquipo2: number,
  cuartosCDEquipo1: number,
  cuartosCDEquipo2: number,
  cuartosEFEquipo1: number,
  cuartosEFEquipo2: number,
  cuartosGHEquipo1: number,
  cuartosGHEquipo2: number,
  semifinal1Equipo1: number,
  semifinal1Equipo2: number,
  semifinal2Equipo1: number,
  semifinal2Equipo2: number,
  finalEquipo1: number,
  finalEquipo2: number,
  campeon: number,
  activo: boolean,
}

export interface CuadroFinalConEquipos {
  octavosAEquipo1: EquipoDB | null,
  octavosAEquipo2: EquipoDB | null,
  octavosBEquipo1: EquipoDB | null,
  octavosBEquipo2: EquipoDB | null,
  octavosCEquipo1: EquipoDB | null,
  octavosCEquipo2: EquipoDB | null,
  octavosDEquipo1: EquipoDB | null,
  octavosDEquipo2: EquipoDB | null,
  octavosEEquipo1: EquipoDB | null,
  octavosEEquipo2: EquipoDB | null,
  octavosFEquipo1: EquipoDB | null,
  octavosFEquipo2: EquipoDB | null,
  octavosGEquipo1: EquipoDB | null,
  octavosGEquipo2: EquipoDB | null,
  octavosHEquipo1: EquipoDB | null,
  octavosHEquipo2: EquipoDB | null,
  cuartosABEquipo1: EquipoDB | null,
  cuartosABEquipo2: EquipoDB | null,
  cuartosCDEquipo1: EquipoDB | null,
  cuartosCDEquipo2: EquipoDB | null,
  cuartosEFEquipo1: EquipoDB | null,
  cuartosEFEquipo2: EquipoDB | null,
  cuartosGHEquipo1: EquipoDB | null,
  cuartosGHEquipo2: EquipoDB | null,
  semifinal1Equipo1: EquipoDB | null,
  semifinal1Equipo2: EquipoDB | null,
  semifinal2Equipo1: EquipoDB | null,
  semifinal2Equipo2: EquipoDB | null,
  finalEquipo1: EquipoDB | null,
  finalEquipo2: EquipoDB | null,
  campeon: EquipoDB | null,
  activo: boolean,
}

export interface PayloadCuadroFinal {
  [clave: string]: number,
}

export const ObtenerCuadroFinalActualBD = async (idTorneo: number): Promise<CuadroFinalDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT cf.* FROM torneoDisciplinaClub as tdc
      INNER JOIN cuadroFinal as cf ON cf.idTorneoDisciplinaClub = tdc.id
      WHERE tdc.id = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo cuadro final actual')
      }
      return resolve(elements)
    })
  })
}

export const CrearCuadroFinalBD = async (idTorneo: number, payload: PayloadCuadroFinal): Promise<CuadroFinalDB[]> => {
  return new Promise((resolve, reject)=> {
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

      const campos = Object.keys(payload)?.map((campo: string) => campo)
      const valores = Object.keys(payload)?.map((campo: string) => payload[campo])

      // Agregar idTorneoDisciplinaClub
      campos.push('idTorneoDisciplinaClub')
      valores.push(idTorneoDisciplinaClub)

      poolConexion.query(`INSERT INTO cuadroFinal (${campos.join(',')}) VALUES(${valores.join(', ')})`, (error: any, elements: any)=> {
        if (error){
          console.log(error)
          return reject('Error creando cuadro final')
        }
        return resolve(elements)
      })
    })
  })
}

export const ActualizarCuadroFinalBD = async (idTorneo: number, payload: PayloadCuadroFinal): Promise<CuadroFinalDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => `cf.${campo} = ${payload[campo]}`
    )

    poolConexion.query(`
      UPDATE cuadroFinal as cf
      INNER JOIN torneoDisciplinaClub as tdc ON tdc.id = cf.idTorneoDisciplinaClub
      SET ${camposActualizar.join(', ')}
      WHERE tdc.id = ${idTorneo} AND tdc.activo = 1 AND cf.activo = 1
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error actualizando cuadro final')
      }
      return resolve(elements)
    })
  })
}
