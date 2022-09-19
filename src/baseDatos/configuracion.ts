import ConexionBaseDatos from './db'

export interface ConfiguracionDB {
  pantallaMostrar: 'grupo' | 'partido' | 'cuadro',
}

export interface PayloadConfiguracion {
  [clave: string]: number,
}

export const ObtenerConfiguracionBD = async (): Promise<ConfiguracionDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query('SELECT * FROM configuracion', (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}

export const ActualizarConfiguracionBD = async (payload: PayloadConfiguracion): Promise<ConfiguracionDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    const camposActualizar = Object.keys(payload)?.map(
      (campo: string) => `${campo} = '${payload[campo]}'`
    )

    poolConexion.query(`UPDATE configuracion SET ${camposActualizar.join(', ')}`, (error: any, elements: any)=> {
      if(error){
        return reject(error)
      }
      return resolve(elements)
    })
  })
}
