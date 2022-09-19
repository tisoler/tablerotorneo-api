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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarConfiguracionBD = exports.ObtenerConfiguracionBD = void 0;
const db_1 = __importDefault(require("./db"));
const ObtenerConfiguracionBD = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const poolConexion = db_1.default.obtenerPoolConexion();
        if (!poolConexion)
            return reject('No hay conexión a la base de datos');
        poolConexion.query('SELECT * FROM configuracion', (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
});
exports.ObtenerConfiguracionBD = ObtenerConfiguracionBD;
const ActualizarConfiguracionBD = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        var _a;
        const poolConexion = db_1.default.obtenerPoolConexion();
        if (!poolConexion)
            return reject('No hay conexión a la base de datos');
        const camposActualizar = (_a = Object.keys(payload)) === null || _a === void 0 ? void 0 : _a.map((campo) => `${campo} = '${payload[campo]}'`);
        poolConexion.query(`UPDATE configuracion SET ${camposActualizar.join(', ')}`, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
});
exports.ActualizarConfiguracionBD = ActualizarConfiguracionBD;
