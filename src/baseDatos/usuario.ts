import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ConexionBaseDatos from './db'

export interface UsuarioBD {
  id: number,
  usuario: string,
  clave: string,
  idDisciplinaClub: number,
  idDisciplina: number,
  idTorneo: number,
}

export interface UsuarioResp {
  token: string,
  idDisciplinaClub: number,
  idDisciplina: number,
  idTorneo: number,
}

export const RegistrarUsuarioBD = async (usuario: string, clave: string): Promise<number> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    poolConexion.query(`SELECT * FROM usuario WHERE usuario = '${usuario}'`, async (error: any, elements: any) => {
      if (error){
        console.log(error)
        return reject('Error obteniendo usuario')
      }
      const usuarioExistinte: UsuarioBD[] = elements
      if (usuarioExistinte.length) {
        return reject('El usuario ya existe')
      }

      const salt = await bcrypt.genSalt(10)
      const claveEncriptada = await bcrypt.hash(clave, salt)
      poolConexion.query(
        `INSERT INTO usuario (usuario, clave) VALUES('${usuario}', '${claveEncriptada}')`,
        (error: any, elements: any) => {
          if (error){
            console.log(error)
            return reject('Error registrando usuario')
          }
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
      SELECT u.*, dc.idDisciplina, dc.id as idDisciplinaClub, tdc.id as idTorneo
      FROM usuario as u
      INNER JOIN disciplinaClub as dc ON dc.idUsuario = u.id
      LEFT JOIN torneoDisciplinaClub as tdc ON tdc.idDisciplinaClub = dc.id and tdc.activo = true
      WHERE u.usuario = '${usuario}'
      `, async (error: any, elements: any) => {

      if (error){
        console.log(error)
        return reject('Error obteniendo usuario')
      }
      const usuarios: UsuarioBD[] = elements
      if (!usuarios.length) {
        return reject('No se puede autenticar')
      }
      const usuario = usuarios[0]

      const esAutenticacionValida = await bcrypt.compare(clave, usuario.clave)
      if (!esAutenticacionValida) {
        return reject('No se puede autenticar')
      }

      const token = jwt.sign({
        usuario: usuario.usuario,
        id: usuario.id,
        idDisciplinaClub: usuario.idDisciplinaClub,
        idDisciplina: usuario.idDisciplina,
        idTorneo: usuario.idTorneo,
      }, process.env.TOKEN_SECRETO || '')

      return resolve({
        token,
        idDisciplinaClub: usuario.idDisciplinaClub,
        idDisciplina: usuario.idDisciplina,
        idTorneo: usuario.idTorneo
      })
    })
  })
}
