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
exports.RutaActualizarCuadroFinal = exports.RutaObtenerCuadroFinal = void 0;
const cuadroFinal_1 = require("../manejadores/cuadroFinal");
const RutaObtenerCuadroFinal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cuadroFinal = yield (0, cuadroFinal_1.ObtenerCuadroFinal)();
        res.status(200).json(cuadroFinal);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaObtenerCuadroFinal = RutaObtenerCuadroFinal;
const RutaActualizarCuadroFinal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req === null || req === void 0 ? void 0 : req.body)) {
            res.sendStatus(400);
            return;
        }
        const cuadroFinal = yield (0, cuadroFinal_1.ActualizarCuadroFinal)(req.body);
        res.status(200).json(cuadroFinal);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaActualizarCuadroFinal = RutaActualizarCuadroFinal;
