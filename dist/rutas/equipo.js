"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutaActualizarEquipo = exports.RutaObtenerEquipos = void 0;
const equipo_1 = require("../manejadores/equipo");
const RutaObtenerEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield (0, equipo_1.ObtenerEquipos)();
        res.status(200).json(equipos);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaObtenerEquipos = RutaObtenerEquipos;
const RutaActualizarEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.idEquipo && !(req === null || req === void 0 ? void 0 : req.body)) {
            res.sendStatus(400);
            return;
        }
        const configuracion = yield (0, equipo_1.ActualizarEquipo)(parseInt(req.params.idEquipo), req.body);
        res.status(200).json(configuracion);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaActualizarEquipo = RutaActualizarEquipo;
