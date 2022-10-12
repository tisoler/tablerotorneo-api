import ConexionBaseDatos from './db'

export interface EquipoDB {
  id: number,
  nombreJugador1: string,
  nombreJugador2: string,
  idGrupo: string,
  posicion: number,
  partidosJugados: number,
  partidosGanados: number,
  diferenciaSets: number,
  diferenciaGames: number,
  puntos: number,
}

export interface PayloadEquipo {
  [clave: string]: number,
}

export const ObtenerEquipoBD = async (idEquipo: number): Promise<EquipoDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`SELECT * FROM equipo WHERE id = ${idEquipo}`, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo equipo')
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
      WHERE dc.id = ${idDisciplinaClub} AND tdc.activo = 1
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo equipos')
      }
      return resolve(elements)
    })
  })
}

export const ActualizarEquipoBD = async (idDisciplinaClub: number, idEquipo: number, payload: PayloadEquipo): Promise<EquipoDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => `e.${campo} = ${payload[campo]}`
    )

    // Validamos acceso con idDisciplinaClub
    poolConexion.query(`
      UPDATE equipo as e
      INNER JOIN torneoDisciplinaClub as tdc ON tdc.id = e.idTorneoDisciplinaClub
      SET ${camposActualizar.join(', ')}
      WHERE e.id = ${idEquipo} AND tdc.idDisciplinaClub = ${idDisciplinaClub}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error actualizando equipos')
      }
      return resolve(elements)
    })
  })
}

