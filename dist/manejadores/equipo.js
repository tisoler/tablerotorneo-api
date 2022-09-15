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
exports.ObtenerEquipos = void 0;
const equipo_1 = require("../baseDatos/equipo");
const ObtenerEquipos = () => __awaiter(void 0, void 0, void 0, function* () {
    const equipos = yield (0, equipo_1.ObtenerEquiposBD)();
    if (!(equipos === null || equipos === void 0 ? void 0 : equipos.length))
        throw new Error('No hay equipos.');
    return equipos;
});
exports.ObtenerEquipos = ObtenerEquipos;
