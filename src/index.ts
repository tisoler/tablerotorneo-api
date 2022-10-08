import express, { Express, Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { RutaActualizarGame, RutaActualizarPartidoActual, RutaObtenerPartidoActual } from './rutas/partidoActual'
import { RutaActualizarEquipo, RutaObtenerEquipos } from './rutas/equipo'
import { RutaActualizarConfiguracion, RutaObtenerConfiguracion } from './rutas/configuracion'
import { RutaActualizarCuadroFinal, RutaObtenerCuadroFinal } from './rutas/cuadroFinal'
import { RutaRegistrarUsuario, RutaAutenticar } from './rutas/usuario'
import verificarToken from './middlewares/verifcarToken'
import { RutaObtenerDisciplinasClubes } from './rutas/disciplinaClub'

dotenv.config()

const { FRONTEND_URL, API_PORT } = process.env

// Creación de servidor

const app: Express = express()
app.use(express.json())
const apiRouter: Router = express.Router()

apiRouter.post('/registrar', RutaRegistrarUsuario)
apiRouter.post('/autenticar', RutaAutenticar)
apiRouter.get('/partidoActual', RutaObtenerPartidoActual)
apiRouter.put('/partidoActual', verificarToken, RutaActualizarPartidoActual)
apiRouter.put('/partidoActual/game', verificarToken, RutaActualizarGame)
apiRouter.get('/equipos', RutaObtenerEquipos)
apiRouter.put('/equipos/:idEquipo', verificarToken, RutaActualizarEquipo)
apiRouter.get('/configuracion/:idDisciplinaClub', RutaObtenerConfiguracion)
apiRouter.put('/configuracion/:idDisciplinaClub', verificarToken, RutaActualizarConfiguracion)
apiRouter.get('/cuadroFinal', RutaObtenerCuadroFinal)
apiRouter.put('/cuadroFinal', verificarToken, RutaActualizarCuadroFinal)
apiRouter.get('/disciplinasClubes', RutaObtenerDisciplinasClubes)

const corsOptions = {
	origin: [FRONTEND_URL, 'http://localhost:3000'],
	optionsSuccessStatus: 200
}

// @ts-ignore
app.use(cors(corsOptions))
app.use(apiRouter)

const port = API_PORT || 3008
app.listen(port, () => {
  console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`)
})
