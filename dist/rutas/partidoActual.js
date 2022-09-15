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
exports.RutaActualizarGame = exports.RutaActualizarPartidoActual = exports.RutaObtenerPartidoActual = void 0;
const partidoActual_1 = require("../manejadores/partidoActual");
const RutaObtenerPartidoActual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidoActual = yield (0, partidoActual_1.ObtenerPartidoActual)();
        res.status(200).json(partidoActual);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaObtenerPartidoActual = RutaObtenerPartidoActual;
const RutaActualizarPartidoActual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidoActual = yield (0, partidoActual_1.ActualizarPartidoActual)(req.body);
        res.status(200).json(partidoActual);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaActualizarPartidoActual = RutaActualizarPartidoActual;
const RutaActualizarGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidoActual = yield (0, partidoActual_1.ActualizarGame)(req.body);
        res.status(200).json(partidoActual);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaActualizarGame = RutaActualizarGame;
