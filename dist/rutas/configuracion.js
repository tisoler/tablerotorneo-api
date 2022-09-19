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
exports.RutaActualizarConfiguracion = exports.RutaObtenerConfiguracion = void 0;
const configuracion_1 = require("../manejadores/configuracion");
const RutaObtenerConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const configuracion = yield (0, configuracion_1.ObtenerConfiguracion)();
        res.status(200).json(configuracion);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaObtenerConfiguracion = RutaObtenerConfiguracion;
const RutaActualizarConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req === null || req === void 0 ? void 0 : req.body)) {
            res.sendStatus(400);
            return;
        }
        const configuracion = yield (0, configuracion_1.ActualizarConfiguracion)(req.body);
        res.status(200).json(configuracion);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaActualizarConfiguracion = RutaActualizarConfiguracion;
