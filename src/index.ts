import express, { Express, Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { RutaActualizarGame, RutaActualizarPartidoActual, RutaObtenerPartidoActual } from './rutas/partidoActual'
import { RutaActualizarEquipo, RutaObtenerEquipos } from './rutas/equipo'
import { RutaAutenticar } from './rutas/autenticar'
import { RutaActualizarConfiguracion, RutaObtenerConfiguracion } from './rutas/configuracion'
import { RutaActualizarCuadroFinal, RutaObtenerCuadroFinal } from './rutas/cuadroFinal'

dotenv.config()

const { FRONTEND_URL, API_PORT } = process.env

// Creación de servidor

const app: Express = express()
app.use(express.json())
const apiRouter: Router = express.Router()

apiRouter.post('/autenticar', RutaAutenticar)
apiRouter.get('/partidoActual', RutaObtenerPartidoActual)
apiRouter.put('/partidoActual', RutaActualizarPartidoActual)
apiRouter.put('/partidoActual/game', RutaActualizarGame)
apiRouter.get('/equipos', RutaObtenerEquipos)
apiRouter.put('/equipos/:idEquipo', RutaActualizarEquipo)
apiRouter.get('/configuracion', RutaObtenerConfiguracion)
apiRouter.put('/configuracion', RutaActualizarConfiguracion)
apiRouter.get('/cuadroFinal', RutaObtenerCuadroFinal)
apiRouter.put('/cuadroFinal', RutaActualizarCuadroFinal)

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
