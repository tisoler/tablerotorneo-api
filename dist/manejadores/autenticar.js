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
exports.Autenticar = void 0;
const Autenticar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { USUARIO, CLAVE } = process.env;
    const { usuario, clave } = payload;
    if (!USUARIO || !CLAVE)
        throw new Error('No se han configurado USUARIO y/o CLAVE.');
    if (!usuario || !clave)
        throw new Error('No se enviaron usuario y/o clave.');
    return USUARIO === usuario && CLAVE === clave;
});
exports.Autenticar = Autenticar;
