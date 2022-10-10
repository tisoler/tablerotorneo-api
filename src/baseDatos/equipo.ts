import ConexionBaseDatos from './db'

export interface EquipoDB {
  id: number,
  nombreJugador1: string,
  nombreJugador2: string,
  idGrupo: string;
  posicion: number,
  partidosJugados: number,
  partidosGanados: number,
  diferenciaSets: number,
  diferenciaGames: number,
}

export interface PayloadEquipo {
  [clave: string]: number,
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

export const ObtenerEquiposBD = async (idDisciplinaClub: number): Promise<EquipoDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT e.* FROM equipo e
      INNER JOIN torneoDisciplinaClub tdc ON tdc.id = e.idTorneoDisciplinaClub
      INNER JOIN disciplinaClub dc ON dc.id = tdc.idDisciplinaClub
      WHERE dc.id = ${idDisciplinaClub}
    `, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

export const ActualizarEquipoBD = async (idEquipo: number, payload: PayloadEquipo): Promise<EquipoDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => `${campo} = ${payload[campo]}`
    )

    poolConexion.query(`UPDATE equipo SET ${camposActualizar.join(', ')} WHERE id = ${idEquipo}`, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

