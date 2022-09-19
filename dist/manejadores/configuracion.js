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
exports.ActualizarConfiguracion = exports.ObtenerConfiguracion = void 0;
const configuracion_1 = require("../baseDatos/configuracion");
const ObtenerConfiguracion = () => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield (0, configuracion_1.ObtenerConfiguracionBD)();
    if (!(resultado === null || resultado === void 0 ? void 0 : resultado.length))
        throw new Error('No hay configuraión.');
    let configuracionDB = resultado[0];
    return configuracionDB;
});
exports.ObtenerConfiguracion = ObtenerConfiguracion;
const ActualizarConfiguracion = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, configuracion_1.ActualizarConfiguracionBD)(payload);
    return yield (0, exports.ObtenerConfiguracion)();
});
exports.ActualizarConfiguracion = ActualizarConfiguracion;
