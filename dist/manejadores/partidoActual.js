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
exports.ActualizarGame = exports.ActualizarPartidoActual = exports.ObtenerPartidoActual = void 0;
const partidoActual_1 = require("../baseDatos/partidoActual");
const equipo_1 = require("../baseDatos/equipo");
const ObtenerPartidoActual = () => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield (0, partidoActual_1.ObtenerPartidoActualBD)();
    if (!(resultado === null || resultado === void 0 ? void 0 : resultado.length))
        throw new Error('No hay partido actual.');
    let partidoActualDB = resultado[0];
    const resultadoEquipo1 = yield (0, equipo_1.ObtenerEquipoBD)(partidoActualDB.idEquipo1);
    const resultadoEquipo2 = yield (0, equipo_1.ObtenerEquipoBD)(partidoActualDB.idEquipo2);
    if (!(resultadoEquipo1 === null || resultadoEquipo1 === void 0 ? void 0 : resultadoEquipo1.length) || !(resultadoEquipo2 === null || resultadoEquipo2 === void 0 ? void 0 : resultadoEquipo2.length))
        throw new Error('No hay equipo 1 ó 2 en el partido actual.');
    const partidoActual = Object.assign(Object.assign({}, partidoActualDB), { equipo1: resultadoEquipo1[0], equipo2: resultadoEquipo2[0] });
    return partidoActual;
});
exports.ObtenerPartidoActual = ObtenerPartidoActual;
const ActualizarPartidoActual = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const actualizacion = yield (0, partidoActual_1.ActualizarPartidoActualBD)(payload);
    return yield (0, exports.ObtenerPartidoActual)();
});
exports.ActualizarPartidoActual = ActualizarPartidoActual;
const procesarTieBreak = (puntajeActual, partidoActual, esEquipo1, suma) => {
    let puntajeGame = puntajeActual + (suma ? 1 : (puntajeActual > 0 ? -1 : 0));
    const puntajeEquipo1 = esEquipo1 ? puntajeGame : partidoActual.equipo1Game;
    const puntajeEquipo2 = !esEquipo1 ? puntajeGame : partidoActual.equipo2Game;
    let payloadGame = {};
    let termino = false;
    switch (partidoActual.setActual) {
        case 2:
            if ((puntajeEquipo1 >= 15 || puntajeEquipo2 >= 15) || ((puntajeEquipo1 >= 7 || puntajeEquipo2 >= 7) && Math.abs(puntajeEquipo1 - puntajeEquipo2) >= 2)) {
                payloadGame = puntajeEquipo1 > puntajeEquipo2 ? { equipo1Set2: partidoActual.equipo1Set2 + 1 } : { equipo2Set2: partidoActual.equipo2Set2 + 1 };
                payloadGame = Object.assign(Object.assign(Object.assign({}, payloadGame), { setActual: partidoActual.setActual + 1 }), (esEquipo1 ? { equipo2Game: 0 } : { equipo1Game: 0 }));
                puntajeGame = 0;
                termino = true;
            }
            break;
        case 3:
            if ((puntajeEquipo1 >= 15 || puntajeEquipo2 >= 15) || ((puntajeEquipo1 >= 11 || puntajeEquipo2 >= 11) && Math.abs(puntajeEquipo1 - puntajeEquipo2) >= 2)) {
                payloadGame = puntajeEquipo1 > puntajeEquipo2 ? { equipo1Set3: partidoActual.equipo1Set3 + 1 } : { equipo2Set3: partidoActual.equipo2Set3 + 1 };
                payloadGame = Object.assign(Object.assign({}, payloadGame), (esEquipo1 ? { equipo2Game: 0 } : { equipo1Game: 0 }));
                puntajeGame = 0;
                termino = true;
            }
            break;
        default:
            if ((puntajeEquipo1 >= 15 || puntajeEquipo2 >= 15) || ((puntajeEquipo1 >= 7 || puntajeEquipo2 >= 7) && Math.abs(puntajeEquipo1 - puntajeEquipo2) >= 2)) {
                payloadGame = puntajeEquipo1 > puntajeEquipo2 ? { equipo1Set1: partidoActual.equipo1Set1 + 1 } : { equipo2Set1: partidoActual.equipo2Set1 + 1 };
                payloadGame = Object.assign(Object.assign(Object.assign({}, payloadGame), { setActual: partidoActual.setActual + 1 }), (esEquipo1 ? { equipo2Game: 0 } : { equipo1Game: 0 }));
                puntajeGame = 0;
                termino = true;
            }
            break;
    }
    // cambio de saque
    if ((puntajeEquipo1 + puntajeEquipo2) % 2 > 0 || termino)
        payloadGame = Object.assign(Object.assign({}, payloadGame), { sacaEquipo1: partidoActual.sacaEquipo1 ? !partidoActual.sacaEquipo1 : true });
    return {
        payloadGame,
        puntajeGame,
    };
};
const game = (partidoActual, esEquipo1) => {
    let payloadGame = {};
    switch (partidoActual.setActual) {
        case 2:
            payloadGame = esEquipo1 ? { equipo1Set2: partidoActual.equipo1Set2 + 1 } : { equipo2Set2: partidoActual.equipo2Set2 + 1 };
            break;
        case 3:
            payloadGame = esEquipo1 ? { equipo1Set3: partidoActual.equipo1Set3 + 1 } : { equipo2Set3: partidoActual.equipo2Set3 + 1 };
            break;
        default:
            payloadGame = esEquipo1 ? { equipo1Set1: partidoActual.equipo1Set1 + 1 } : { equipo2Set1: partidoActual.equipo2Set1 + 1 };
            break;
    }
    // validar si cambiar set
    let gamesEnSetEquipo1 = 0;
    let gamesEnSetEquipo2 = 0;
    if (partidoActual.setActual === 1) {
        gamesEnSetEquipo1 = partidoActual.equipo1Set1 + (esEquipo1 ? 1 : 0);
        gamesEnSetEquipo2 = partidoActual.equipo2Set1 + (esEquipo1 ? 0 : 1);
        if ((gamesEnSetEquipo1 >= 6 || gamesEnSetEquipo2 >= 6) && Math.abs(gamesEnSetEquipo1 - gamesEnSetEquipo2) >= 2) {
            payloadGame = Object.assign(Object.assign({}, payloadGame), { setActual: partidoActual.setActual + 1 });
        }
    }
    else if (partidoActual.setActual === 2) {
        gamesEnSetEquipo1 = partidoActual.equipo1Set2 + (esEquipo1 ? 1 : 0);
        gamesEnSetEquipo2 = partidoActual.equipo2Set2 + (esEquipo1 ? 0 : 1);
        if ((gamesEnSetEquipo1 >= 6 || gamesEnSetEquipo2 >= 6) && Math.abs(gamesEnSetEquipo1 - gamesEnSetEquipo2) >= 2) {
            payloadGame = Object.assign(Object.assign({}, payloadGame), { setActual: partidoActual.setActual + 1, tipoSet: 'tie-break' });
        }
    }
    const cambioSaque = { sacaEquipo1: (partidoActual === null || partidoActual === void 0 ? void 0 : partidoActual.sacaEquipo1) ? !partidoActual.sacaEquipo1 : true };
    return Object.assign(Object.assign(Object.assign({}, payloadGame), (!esEquipo1 ? { equipo1Game: 0 } : { equipo2Game: 0 })), cambioSaque);
};
const obtenerPayloadActualizacion = (suma, esEquipo1) => __awaiter(void 0, void 0, void 0, function* () {
    let puntaje = 0;
    const partidoActual = yield (0, exports.ObtenerPartidoActual)();
    const puntajeActual = esEquipo1 ? partidoActual.equipo1Game : partidoActual.equipo2Game;
    const puntajeActualOtroEquipo = !esEquipo1 ? partidoActual.equipo1Game : partidoActual.equipo2Game;
    let payload = {};
    switch (partidoActual.tipoGame) {
        case 'tie-break':
            const { puntajeGame, payloadGame } = procesarTieBreak(puntajeActual, partidoActual, esEquipo1, suma);
            puntaje = puntajeGame;
            payload = payloadGame;
            break;
        default:
            switch (puntajeActual) {
                case 15:
                    puntaje = suma ? 30 : 0;
                    break;
                case 30:
                    puntaje = suma ? 40 : 15;
                    break;
                case 40:
                    if (!suma)
                        puntaje = 30;
                    else {
                        if (puntajeActualOtroEquipo > 40) { // iguales
                            payload = !esEquipo1 ? { equipo1Game: 40 } : { equipo2Game: 40 };
                            puntaje = 40;
                        }
                        else if (puntajeActualOtroEquipo === 40)
                            puntaje = 50; // ventaja
                        else {
                            puntaje = 0; // game
                            payload = game(partidoActual, esEquipo1);
                        }
                    }
                    break;
                case 50: // game
                    if (suma) {
                        puntaje = 0;
                        payload = game(partidoActual, esEquipo1);
                    }
                    else {
                        puntaje = 40;
                    }
                    break;
                default: // 0
                    puntaje = suma ? 15 : 0;
                    break;
            }
            break;
    }
    return Object.assign(Object.assign({}, payload), (esEquipo1 ? { equipo1Game: puntaje } : { equipo2Game: puntaje }));
});
const ActualizarGame = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { suma, esEquipo1 } = payload;
    const payloadActualizar = yield obtenerPayloadActualizacion(suma, esEquipo1);
    yield (0, exports.ActualizarPartidoActual)(payloadActualizar);
    return yield (0, exports.ObtenerPartidoActual)();
});
exports.ActualizarGame = ActualizarGame;
