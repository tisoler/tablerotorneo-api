import express, { Express, Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {
	RutaActualizarGame,
	RutaActualizarPartidoTenisPadel,
	RutaBorrarPartidoTenisPadel,
	RutaCrearPartidoTenisPadel,
	RutaObtenerPartidosTenisPadelParaTorneo,
	RutaObtenerPartidoTenisPadelActual
} from './rutas/partidoTenisPadel'
import { RutaActualizarEquipo, RutaObtenerEquiposParaTorneo } from './rutas/equipo'
import { RutaActualizarConfiguracion, RutaObtenerConfiguracion } from './rutas/configuracion'
import { RutaObtenerCuadroFinalParaTorneo, RutaCrearActualizarCuadroParaTorneo } from './rutas/cuadroFinal'
import { RutaRegistrarUsuario, RutaAutenticar } from './rutas/usuario'
import verificarToken from './middlewares/verifcarToken'
import { RutaObtenerDisciplinasClubes } from './rutas/disciplinaClub'
import { RutaActualizarPartidoFutbolActual, RutaBorrarPartidoFutbolActual, RutaCrearPartidoFutbolActual, RutaObtenerPartidoFutbolActual } from './rutas/partidoFutbol'
import { RutaActualizarPartidoHockeyActual, RutaBorrarPartidoHockeyActual, RutaCrearPartidoHockeyActual, RutaObtenerPartidoHockeyActual } from './rutas/partidoHockey'
import { RutaObtenerTorneoActual, RutaObtenerTorneos } from './rutas/torneo'

dotenv.config()

const { FRONTEND_URL, API_PORT } = process.env

// Creación de servidor

const app: Express = express()
app.use(express.json())
const apiRouter: Router = express.Router()

apiRouter.post('/registrar', RutaRegistrarUsuario)
apiRouter.post('/autenticar', RutaAutenticar)

apiRouter.get('/disciplinasClubes', RutaObtenerDisciplinasClubes)

apiRouter.get('/configuracion/:idDisciplinaClub', RutaObtenerConfiguracion)
apiRouter.put('/configuracion', verificarToken, RutaActualizarConfiguracion)

apiRouter.get('/torneo/torneoActual/:idDisciplinaClub', RutaObtenerTorneoActual)
apiRouter.get('/torneo/:idDisciplinaClub', RutaObtenerTorneos)

apiRouter.get('/partidoTenisPadel', verificarToken, RutaObtenerPartidoTenisPadelActual)
apiRouter.get('/partidoTenisPadel/:idTorneo', RutaObtenerPartidoTenisPadelActual)
apiRouter.get('/partidoTenisPadel/torneo/:idTorneo', RutaObtenerPartidosTenisPadelParaTorneo)
apiRouter.post('/partidoTenisPadel', verificarToken, RutaCrearPartidoTenisPadel)
apiRouter.put('/partidoTenisPadel/:idPartidoTenisPadel', verificarToken, RutaActualizarPartidoTenisPadel)
apiRouter.put('/partidoTenisPadel/game/:idPartidoTenisPadel', verificarToken, RutaActualizarGame)
apiRouter.delete('/partidoTenisPadel/:idPartidoTenisPadel', verificarToken, RutaBorrarPartidoTenisPadel)

apiRouter.get('/partidoFutbolActual', verificarToken, RutaObtenerPartidoFutbolActual)
apiRouter.get('/partidoFutbolActual/:idTorneo', RutaObtenerPartidoFutbolActual)
apiRouter.post('/partidoFutbolActual', verificarToken, RutaCrearPartidoFutbolActual)
apiRouter.put('/partidoFutbolActual/:idPartidoFutbol', verificarToken, RutaActualizarPartidoFutbolActual)
apiRouter.delete('/partidoFutbolActual/:idPartidoFutbol', verificarToken, RutaBorrarPartidoFutbolActual)

apiRouter.get('/partidoHockeyActual', verificarToken, RutaObtenerPartidoHockeyActual)
apiRouter.get('/partidoHockeyActual/:idTorneo', RutaObtenerPartidoHockeyActual)
apiRouter.post('/partidoHockeyActual', verificarToken, RutaCrearPartidoHockeyActual)
apiRouter.put('/partidoHockeyActual/:idPartidoHockey', verificarToken, RutaActualizarPartidoHockeyActual)
apiRouter.delete('/partidoHockeyActual/:idPartidoHockey', verificarToken, RutaBorrarPartidoHockeyActual)

apiRouter.get('/equipos', verificarToken, RutaObtenerEquiposParaTorneo)
apiRouter.get('/equipos/:idTorneo', RutaObtenerEquiposParaTorneo)
apiRouter.put('/equipos/:idEquipo', verificarToken, RutaActualizarEquipo)

apiRouter.get('/cuadroFinal/:idTorneo', RutaObtenerCuadroFinalParaTorneo)
apiRouter.get('/cuadroFinal', verificarToken, RutaObtenerCuadroFinalParaTorneo)
apiRouter.post('/cuadroFinal', verificarToken, RutaCrearActualizarCuadroParaTorneo)

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
