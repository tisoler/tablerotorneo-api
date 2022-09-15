import ConexionBaseDatos from './db'

export interface EquipoDB {
  nombreJugador1: string,
  nombreJugador2: string,
  puntos: number,
}

export const ObtenerEquipoBD = async (idEquipo: number): Promise<EquipoDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`SELECT * FROM equipo WHERE id = ${idEquipo}`, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

export const ObtenerEquiposBD = async (): Promise<EquipoDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`SELECT * FROM equipo`, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}
