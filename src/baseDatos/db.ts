import mysql, { Pool } from 'mysql'

export default class ConexionBaseDatos {
  static instancia: Pool

  static obtenerPoolConexion = (): Pool | null => {
    if (!ConexionBaseDatos.instancia) {
      const { BASE_DATOS_HOST, BASE_DATOS_PORT, BASE_DATOS_USUARIO, BASE_DATOS_PASSWORD, BASE_DATOS } = process.env
      if (!BASE_DATOS_USUARIO || !BASE_DATOS_PASSWORD || !BASE_DATOS) {
        console.error('error: falta una o varias variables de entorno (BASE_DATOS_USUARIO, BASE_DATOS_PASSWORD, BASE_DATOS)')
        return null
      }

      ConexionBaseDatos.instancia = mysql.createPool({
        connectionLimit: 10,    
        password: BASE_DATOS_PASSWORD,
        user: BASE_DATOS_USUARIO,
        database: BASE_DATOS,
        host: BASE_DATOS_HOST || 'localhost',
        port: BASE_DATOS_PORT ? parseInt(BASE_DATOS_PORT) : 3306
      })
    }

    return ConexionBaseDatos.instancia
  }
}
