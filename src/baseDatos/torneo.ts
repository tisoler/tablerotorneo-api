import ConexionBaseDatos from './db'

export interface TorneoBD {
  id?: number,
  iniciales?: string,
  nombreMostrar?: string,
  sponsor?: string,
  imagenSponsor?: string,
  imagenEscudo?: string,
  colorFondoSponsor?: string,
  activo?: boolean,
  idTipoTorneo?: number,
}

export const ObtenerTorneosBD = async (idDisciplinaClub: number): Promise<TorneoBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT tdc.id, tdc.iniciales, tdc.nombreMostrar, tdc.sponsor, tdc.imagenSponsor, tdc.colorFondoSponsor, tdc.activo, c.imagenEscudo FROM torneoDisciplinaClub as tdc
      INNER JOIN disciplinaClub as dc ON dc.id = tdc.idDisciplinaClub
      INNER JOIN club as c ON c.id = dc.idClub
      WHERE tdc.idDisciplinaClub = ${idDisciplinaClub}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo torneos para la disciplina y club.')
      }
      return resolve(elements)
    })
  })
}

export const ObtenerTorneoBD = async (idTorneo: number): Promise<TorneoBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT * FROM torneoDisciplinaClub
      WHERE id = ${idTorneo}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject(`Error obteniendo torneo para id ${idTorneo}.`)
      }
      return resolve(elements)
    })
  })
}
