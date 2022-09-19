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
exports.RutaAutenticar = void 0;
const autenticar_1 = require("../manejadores/autenticar");
const RutaAutenticar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valido = yield (0, autenticar_1.Autenticar)(req.body);
        if (valido)
            res.status(200).json({ valido });
        else
            res.status(400).json({ valido });
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
exports.RutaAutenticar = RutaAutenticar;
