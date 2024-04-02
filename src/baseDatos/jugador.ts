import ConexionBaseDatos from './db'

export interface JugadorDB {
  id: number,
  nombre: string,
  apellido: string,
  idDisciplinaClub: number,
  idCategoria: number,
  ranking: number,
  puntos: number,
  foto: string,
  localidad: string,
}

export const ObtenerJuagadoresParaDisciplinaClubCategogiaBD = async (idDisciplinaClub: number, idCategoria?: number): Promise<JugadorDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT * FROM jugador
      WHERE idDisciplinaClub = ${idDisciplinaClub}
      ${idCategoria ? 'AND idCategoria = ' + idCategoria : ''}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo jugadores')
      }
      return resolve(elements)
    })
  })
}
