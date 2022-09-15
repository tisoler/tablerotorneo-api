import ConexionBaseDatos from './db'
import { EquipoDB } from './equipo'

export interface PartidoActualDB {
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
}

export type PartidoActualDBConEquipos = PartidoActualDB & {
  equipo1: EquipoDB,
  equipo2: EquipoDB,
}

export interface PayloadPartidoActual {
  [clave: string]: number,
}

export const ObtenerPartidoActualBD = async (): Promise<PartidoActualDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query('SELECT * FROM partidoActual', (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

export const ActualizarPartidoActualBD = async (payload: PayloadPartidoActual): Promise<PartidoActualDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => campo !== 'tipoSet' && campo !== 'tipoGame' ? `${campo} = ${payload[campo]}` : `${campo} = '${payload[campo]}'`
    )

    poolConexion.query(`UPDATE partidoActual SET ${camposActualizar.join(', ')}`, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}
