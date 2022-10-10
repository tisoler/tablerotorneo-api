import ConexionBaseDatos from './db'

export interface TorneoBD {
  iniciales?: string,
  nombreMostrar?: string,
  sponsor?: string,
  imagenSponsor?: string,
  imagenEscudo?: string,
  colorFondoSponsor?: string,
}

export const ObtenerTorneoActualBD = async (idDisciplinaClub: number): Promise<TorneoBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT tdc.iniciales, tdc.nombreMostrar, tdc.sponsor, tdc.imagenSponsor, tdc.colorFondoSponsor, c.imagenEscudo FROM torneoDisciplinaClub as tdc
      INNER JOIN disciplinaClub as dc ON dc.id = tdc.idDisciplinaClub
      INNER JOIN club as c ON c.id = dc.idClub
      WHERE tdc.idDisciplinaClub = ${idDisciplinaClub}
    `, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}
