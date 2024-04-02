import ConexionBaseDatos from './db'

export interface CategoriaDB {
  id: number,
  descripcion: string,
}

export const ObtenerCategoriasParaDisciplinaClubBD = async (idDisciplinaClub: number): Promise<CategoriaDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT * FROM categoria
      WHERE idDisciplinaClub = ${idDisciplinaClub}
      ORDER BY descripcion
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo categorías')
      }
      return resolve(elements)
    })
  })
}
