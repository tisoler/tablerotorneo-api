"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class ConexionBaseDatos {
}
exports.default = ConexionBaseDatos;
ConexionBaseDatos.obtenerPoolConexion = () => {
    if (!ConexionBaseDatos.instancia) {
        const { BASE_DATOS_HOST, BASE_DATOS_PORT, BASE_DATOS_USUARIO, BASE_DATOS_PASSWORD, BASE_DATOS } = process.env;
        if (!BASE_DATOS_USUARIO || !BASE_DATOS_PASSWORD || !BASE_DATOS) {
            console.error('error: falta una o varias variables de entorno (BASE_DATOS_USUARIO, BASE_DATOS_PASSWORD, BASE_DATOS)');
            return null;
        }
        ConexionBaseDatos.instancia = mysql_1.default.createPool({
            connectionLimit: 10,
            password: BASE_DATOS_PASSWORD,
            user: BASE_DATOS_USUARIO,
            database: BASE_DATOS,
            host: BASE_DATOS_HOST || 'localhost',
            port: BASE_DATOS_PORT ? parseInt(BASE_DATOS_PORT) : 3306
        });
    }
    return ConexionBaseDatos.instancia;
};
