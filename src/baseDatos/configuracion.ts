import ConexionBaseDatos from './db'

export interface ConfiguracionDB {
  pantallaMostrar: 'grupo' | 'partido' | 'cuadro',
}

export interface PayloadConfiguracion {
  [clave: string]: number,
}

export const ObtenerConfiguracionBD = async (idDisciplinaClub: number): Promise<ConfiguracionDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`SELECT c.* FROM configuracion as c INNER JOIN disciplinaClub as dc ON dc.idConfiguracion = c.id WHERE dc.id = ${idDisciplinaClub}`, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendo configuración')
      }
      return resolve(elements)
    })
  })
}

export const ActualizarConfiguracionBD = async (idDisciplinaClub: number, payload: PayloadConfiguracion): Promise<ConfiguracionDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => `${campo} = '${payload[campo]}'`
    )

    poolConexion.query(`
      UPDATE configuracion as c
      INNER JOIN disciplinaClub as dc ON dc.idConfiguracion = c.id
      SET ${camposActualizar.join(', ')}
      WHERE dc.id = ${idDisciplinaClub}
    `, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error actualizando configuración')
      }
      return resolve(elements)
    })
  })
}
