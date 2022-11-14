import express, { Express, Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { RutaActualizarGame, RutaActualizarPartidoActual, RutaObtenerPartidoActual } from './rutas/partidoActual'
import { RutaActualizarEquipo, RutaObtenerEquipos } from './rutas/equipo'
import { RutaActualizarConfiguracion, RutaObtenerConfiguracion } from './rutas/configuracion'
import { RutaCrearActualizarCuadroFinal, RutaObtenerCuadroFinalActual } from './rutas/cuadroFinal'
import { RutaRegistrarUsuario, RutaAutenticar } from './rutas/usuario'
import verificarToken from './middlewares/verifcarToken'
import { RutaObtenerDisciplinasClubes } from './rutas/disciplinaClub'
import { RutaActualizarPartidoFutbolActual, RutaBorrarPartidoFutbolActual, RutaCrearPartidoFutbolActual, RutaObtenerPartidoFutbolActual } from './rutas/partidoFutbol'
import { RutaActualizarPartidoHockeyActual, RutaBorrarPartidoHockeyActual, RutaCrearPartidoHockeyActual, RutaObtenerPartidoHockeyActual } from './rutas/partidoHockey'
import { RutaObtenerTorneoActual } from './rutas/torneo'

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

apiRouter.get('/partidoFutbolActual', verificarToken, RutaObtenerPartidoFutbolActual)
apiRouter.get('/partidoFutbolActual/:idDisciplinaClub', RutaObtenerPartidoFutbolActual)
apiRouter.post('/partidoFutbolActual', verificarToken, RutaCrearPartidoFutbolActual)
apiRouter.put('/partidoFutbolActual/:idPartidoFutbol', verificarToken, RutaActualizarPartidoFutbolActual)
apiRouter.delete('/partidoFutbolActual/:idPartidoFutbol', verificarToken, RutaBorrarPartidoFutbolActual)

apiRouter.get('/partidoHockeyActual', verificarToken, RutaObtenerPartidoHockeyActual)
apiRouter.get('/partidoHockeyActual/:idDisciplinaClub', RutaObtenerPartidoHockeyActual)
apiRouter.post('/partidoHockeyActual', verificarToken, RutaCrearPartidoHockeyActual)
apiRouter.put('/partidoHockeyActual/:idPartidoHockey', verificarToken, RutaActualizarPartidoHockeyActual)
apiRouter.delete('/partidoHockeyActual/:idPartidoHockey', verificarToken, RutaBorrarPartidoHockeyActual)

apiRouter.get('/equipos', verificarToken, RutaObtenerEquipos)
apiRouter.get('/equipos/:idDisciplinaClub', RutaObtenerEquipos)
apiRouter.put('/equipos/:idEquipo', verificarToken, RutaActualizarEquipo)

apiRouter.get('/configuracion/:idDisciplinaClub', RutaObtenerConfiguracion)
apiRouter.put('/configuracion', verificarToken, RutaActualizarConfiguracion)

apiRouter.get('/cuadroFinalActual/:idDisciplinaClub', RutaObtenerCuadroFinalActual)
apiRouter.get('/cuadroFinalActual', verificarToken, RutaObtenerCuadroFinalActual)
apiRouter.post('/cuadroFinalActual', verificarToken, RutaCrearActualizarCuadroFinal)

apiRouter.get('/disciplinasClubes', RutaObtenerDisciplinasClubes)

apiRouter.get('/torneoActual/:idDisciplinaClub', RutaObtenerTorneoActual)

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
