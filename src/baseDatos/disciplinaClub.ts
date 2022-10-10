import ConexionBaseDatos from "./db";

export interface DisciplinaClubBD {
  id: number,
  idClub: number,
  nombreClub: string,
  idDisciplina: number;
  nombreDisciplina: string,
  idLocalidad: number,
  nombreLocalidad: string,
  colorPrincipal: string,
  colorSecundario: string,
  imagenEscudo: string;
}

export const ObtenerDisciplinasClubesBD = async (): Promise<DisciplinaClubBD[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
      SELECT dc.id,
        c.id as idClub,
        c.nombre as nombreClub,
        d.id as idDisciplina,
        d.nombre as nombreDisciplina,
        l.id as idLocalidad,
        l.nombre as nombreLocalidad,
        c.colorPrincipal,
        c.colorSecundario,
        c.imagenEscudo
      FROM disciplinaClub as dc
      INNER JOIN club as c ON c.id = dc.idClub
      INNER JOIN disciplina as d ON d.id = dc.idDisciplina
      INNER JOIN localidad as l ON l.id = c.idLocalidad
    `,
    (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}
