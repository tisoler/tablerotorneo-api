"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const partidoActual_1 = require("./rutas/partidoActual");
const equipo_1 = require("./rutas/equipo");
const autenticar_1 = require("./rutas/autenticar");
const configuracion_1 = require("./rutas/configuracion");
const cuadroFinal_1 = require("./rutas/cuadroFinal");
dotenv_1.default.config();
const { FRONTEND_URL, API_PORT } = process.env;
// Creación de servidor
const app = (0, express_1.default)();
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
apiRouter.post('/autenticar', autenticar_1.RutaAutenticar);
apiRouter.get('/partidoActual', partidoActual_1.RutaObtenerPartidoActual);
apiRouter.put('/partidoActual', partidoActual_1.RutaActualizarPartidoActual);
apiRouter.put('/partidoActual/game', partidoActual_1.RutaActualizarGame);
apiRouter.get('/equipos', equipo_1.RutaObtenerEquipos);
apiRouter.put('/equipos/:idEquipo', equipo_1.RutaActualizarEquipo);
apiRouter.get('/configuracion', configuracion_1.RutaObtenerConfiguracion);
apiRouter.put('/configuracion', configuracion_1.RutaActualizarConfiguracion);
apiRouter.get('/cuadroFinal', cuadroFinal_1.RutaObtenerCuadroFinal);
apiRouter.put('/cuadroFinal', cuadroFinal_1.RutaActualizarCuadroFinal);
const corsOptions = {
    origin: [FRONTEND_URL, 'http://localhost:3000'],
    optionsSuccessStatus: 200
};
// @ts-ignore
app.use((0, cors_1.default)(corsOptions));
app.use(apiRouter);
const port = API_PORT || 3008;
app.listen(port, () => {
    console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`);
});
