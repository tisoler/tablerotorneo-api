import ConexionBaseDatos from './db'
import { EquipoDB } from './equipo'

export interface CuadroFinalDB {
  cuartosAEquipo1: number,
  cuartosAEquipo2: number,
  cuartosBEquipo1: number,
  cuartosBEquipo2: number,
  cuartosCEquipo1: number,
  cuartosCEquipo2: number,
  cuartosDEquipo1: number,
  cuartosDEquipo2: number,
  semifinalAEquipo1: number,
  semifinalAEquipo2: number,
  semifinalBEquipo1: number,
  semifinalBEquipo2: number,
  finalEquipo1: number,
  finalEquipo2: number,
  campeon: number,
}

export interface CuadroFinalConEquipos {
  cuartosAEquipo1: EquipoDB | null,
  cuartosAEquipo2: EquipoDB | null,
  cuartosBEquipo1: EquipoDB | null,
  cuartosBEquipo2: EquipoDB | null,
  cuartosCEquipo1: EquipoDB | null,
  cuartosCEquipo2: EquipoDB | null,
  cuartosDEquipo1: EquipoDB | null,
  cuartosDEquipo2: EquipoDB | null,
  semifinalAEquipo1: EquipoDB | null,
  semifinalAEquipo2: EquipoDB | null,
  semifinalBEquipo1: EquipoDB | null,
  semifinalBEquipo2: EquipoDB | null,
  finalEquipo1: EquipoDB | null,
  finalEquipo2: EquipoDB | null,
}

export interface PayloadCuadroFinal {
  [clave: string]: number,
}

export const ObtenerCuadroFinalBD = async (): Promise<CuadroFinalDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query('SELECT * FROM cuadroFinal', (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

export const ActualizarCuadroFinalBD = async (payload: PayloadCuadroFinal): Promise<CuadroFinalDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => `${campo} = ${payload[campo]}`
    )

    poolConexion.query(`UPDATE cuadroFinal SET ${camposActualizar.join(', ')}`, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}
