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
exports.ActualizarCuadroFinal = exports.ObtenerCuadroFinal = void 0;
const cuadroFinal_1 = require("../baseDatos/cuadroFinal");
const equipo_1 = require("../baseDatos/equipo");
const ObtenerCuadroFinal = () => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield (0, cuadroFinal_1.ObtenerCuadroFinalBD)();
    if (!(resultado === null || resultado === void 0 ? void 0 : resultado.length))
        throw new Error('No hay cuadro final.');
    let cuadroFinalDB = resultado[0];
    const cuartosAEquipo1 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.cuartosAEquipo1);
    const cuartosAEquipo2 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.cuartosAEquipo2);
    const cuartosBEquipo1 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.cuartosBEquipo1);
    const cuartosBEquipo2 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.cuartosBEquipo2);
    const cuartosCEquipo1 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.cuartosCEquipo1);
    const cuartosCEquipo2 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.cuartosCEquipo2);
    const cuartosDEquipo1 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.cuartosDEquipo1);
    const cuartosDEquipo2 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.cuartosDEquipo2);
    const semifinalAEquipo1 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.semifinalAEquipo1);
    const semifinalAEquipo2 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.semifinalAEquipo2);
    const semifinalBEquipo1 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.semifinalBEquipo1);
    const semifinalBEquipo2 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.semifinalBEquipo2);
    const finalEquipo1 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.finalEquipo1);
    const finalEquipo2 = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.finalEquipo2);
    const campeon = yield (0, equipo_1.ObtenerEquipoBD)(cuadroFinalDB.campeon);
    const cuadroFinal = {
        cuartosAEquipo1: (cuartosAEquipo1 === null || cuartosAEquipo1 === void 0 ? void 0 : cuartosAEquipo1.length) ? cuartosAEquipo1[0] : null,
        cuartosAEquipo2: (cuartosAEquipo2 === null || cuartosAEquipo2 === void 0 ? void 0 : cuartosAEquipo2.length) ? cuartosAEquipo2[0] : null,
        cuartosBEquipo1: (cuartosBEquipo1 === null || cuartosBEquipo1 === void 0 ? void 0 : cuartosBEquipo1.length) ? cuartosBEquipo1[0] : null,
        cuartosBEquipo2: (cuartosBEquipo2 === null || cuartosBEquipo2 === void 0 ? void 0 : cuartosBEquipo2.length) ? cuartosBEquipo2[0] : null,
        cuartosCEquipo1: (cuartosCEquipo1 === null || cuartosCEquipo1 === void 0 ? void 0 : cuartosCEquipo1.length) ? cuartosCEquipo1[0] : null,
        cuartosCEquipo2: (cuartosCEquipo2 === null || cuartosCEquipo2 === void 0 ? void 0 : cuartosCEquipo2.length) ? cuartosCEquipo2[0] : null,
        cuartosDEquipo1: (cuartosDEquipo1 === null || cuartosDEquipo1 === void 0 ? void 0 : cuartosDEquipo1.length) ? cuartosDEquipo1[0] : null,
        cuartosDEquipo2: (cuartosDEquipo2 === null || cuartosDEquipo2 === void 0 ? void 0 : cuartosDEquipo2.length) ? cuartosDEquipo2[0] : null,
        semifinalAEquipo1: (semifinalAEquipo1 === null || semifinalAEquipo1 === void 0 ? void 0 : semifinalAEquipo1.length) ? semifinalAEquipo1[0] : null,
        semifinalAEquipo2: (semifinalAEquipo2 === null || semifinalAEquipo2 === void 0 ? void 0 : semifinalAEquipo2.length) ? semifinalAEquipo2[0] : null,
        semifinalBEquipo1: (semifinalBEquipo1 === null || semifinalBEquipo1 === void 0 ? void 0 : semifinalBEquipo1.length) ? semifinalBEquipo1[0] : null,
        semifinalBEquipo2: (semifinalBEquipo2 === null || semifinalBEquipo2 === void 0 ? void 0 : semifinalBEquipo2.length) ? semifinalBEquipo2[0] : null,
        finalEquipo1: (finalEquipo1 === null || finalEquipo1 === void 0 ? void 0 : finalEquipo1.length) ? finalEquipo1[0] : null,
        finalEquipo2: (finalEquipo2 === null || finalEquipo2 === void 0 ? void 0 : finalEquipo2.length) ? finalEquipo2[0] : null,
        campeon: (campeon === null || campeon === void 0 ? void 0 : campeon.length) ? campeon[0] : null,
    };
    return cuadroFinal;
});
exports.ObtenerCuadroFinal = ObtenerCuadroFinal;
const ActualizarCuadroFinal = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, cuadroFinal_1.ActualizarCuadroFinalBD)(payload);
    return yield (0, exports.ObtenerCuadroFinal)();
});
exports.ActualizarCuadroFinal = ActualizarCuadroFinal;
