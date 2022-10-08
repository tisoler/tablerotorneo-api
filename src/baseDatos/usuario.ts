import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ConexionBaseDatos from './db'

export interface UsuarioDB {
  id: number,
  usuario: string,
  clave: string,
}

export interface UsuarioResp {
  usuario: {
    id: number,
    usuario: string,
    idDisciplinaClub: number,
  },
  token: string,
}

export const RegistrarUsuarioBD = async (usuario: string, clave: string): Promise<number> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    poolConexion.query(`SELECT * FROM usuario WHERE usuario = '${usuario}'`, async (error: any, elements: any) => {
      if(error){
        return reject(error)
      }
      const usuarioExistinte: UsuarioDB[] = elements
      if (usuarioExistinte.length) {
        return reject('El usuario ya existe')
      }

      const salt = await bcrypt.genSalt(10)
      const claveEncriptada = await bcrypt.hash(clave, salt)
      poolConexion.query(
        `INSERT INTO usuario (usuario, clave) VALUES('${usuario}', '${claveEncriptada}')`,
        (error: any, elements: any) => {
          return resolve(elements.insertId)
        }
      )
    })
  })
}

export const AutenticarBD = async (usuario: string, clave: string): Promise<UsuarioResp> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    
    poolConexion.query(`
      SELECT u.*, dc.id as idDisciplinaClub
      FROM usuario as u
      INNER JOIN disciplinaClub as dc ON dc.idUsuario = u.id
      WHERE u.usuario = '${usuario}'
      `, async (error: any, elements: any) => {

      if(error){
        return reject(error)
      }
      const usuarios: UsuarioDB[] = elements
      if (!usuarios.length) {
        return reject('No se puede autenticar')
      }
      const usuario = usuarios[0]

      const esAutenticacionValida = await bcrypt.compare(clave, usuario.clave)
      if (!esAutenticacionValida) {
        return reject('No se puede autenticar')
      }

      const token = jwt.sign({ usuario: usuario.usuario, id: usuario.id }, process.env.TOKEN_SECRETO || '')

      return resolve({ usuario, token })
    })
  })
}
