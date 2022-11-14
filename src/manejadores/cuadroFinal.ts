import {
  CuadroFinalConEquipos,
  PayloadCuadroFinal,
  CuadroFinalDB,
  ObtenerCuadroFinalActualBD,
  CrearCuadroFinalBD,
  ActualizarCuadroFinalBD
} from "../baseDatos/cuadroFinal"
import { EquipoDB, ObtenerEquipoBD } from "../baseDatos/equipo"

export const ObtenerCuadroFinalActual = async (idDisciplinaClub: number): Promise<CuadroFinalConEquipos | null> => {
  const resultado: CuadroFinalDB[] = await ObtenerCuadroFinalActualBD(idDisciplinaClub)
  if (!resultado?.length) {
    console.log('No hay cuadro final actual para el torneo.')
    return null
  }

  let cuadroFinalDB = resultado[0]

  const octavosAEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosAEquipo1)
  const octavosAEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosAEquipo2)
  const octavosBEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosBEquipo1)
  const octavosBEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosBEquipo2)
  const octavosCEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosCEquipo1)
  const octavosCEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosCEquipo2)
  const octavosDEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosDEquipo1)
  const octavosDEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosDEquipo2)
  const octavosEEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosEEquipo1)
  const octavosEEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosEEquipo2)
  const octavosFEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosFEquipo1)
  const octavosFEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosFEquipo2)
  const octavosGEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosGEquipo1)
  const octavosGEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosGEquipo2)
  const octavosHEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosHEquipo1)
  const octavosHEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.octavosHEquipo2)
  const cuartosABEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosABEquipo1)
  const cuartosABEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosABEquipo2)
  const cuartosCDEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosCDEquipo1)
  const cuartosCDEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosCDEquipo2)
  const cuartosEFEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosEFEquipo1)
  const cuartosEFEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosEFEquipo2)
  const cuartosGHEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosGHEquipo1)
  const cuartosGHEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosGHEquipo2)
  const semifinal1Equipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.semifinal1Equipo1)
  const semifinal1Equipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.semifinal1Equipo2)
  const semifinal2Equipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.semifinal2Equipo1)
  const semifinal2Equipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.semifinal2Equipo2)
  const finalEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.finalEquipo1)
  const finalEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.finalEquipo2)
  const campeon: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.campeon)

  const cuadroFinal = {
    octavosAEquipo1: octavosAEquipo1?.length ? octavosAEquipo1[0] : null,
    octavosAEquipo2: octavosAEquipo2?.length ? octavosAEquipo2[0] : null,
    octavosBEquipo1: octavosBEquipo1?.length ? octavosBEquipo1[0] : null,
    octavosBEquipo2: octavosBEquipo2?.length ? octavosBEquipo2[0] : null,
    octavosCEquipo1: octavosCEquipo1?.length ? octavosCEquipo1[0] : null,
    octavosCEquipo2: octavosCEquipo2?.length ? octavosCEquipo2[0] : null,
    octavosDEquipo1: octavosDEquipo1?.length ? octavosDEquipo1[0] : null,
    octavosDEquipo2: octavosDEquipo2?.length ? octavosDEquipo2[0] : null,
    octavosEEquipo1: octavosEEquipo1?.length ? octavosEEquipo1[0] : null,
    octavosEEquipo2: octavosEEquipo2?.length ? octavosEEquipo2[0] : null,
    octavosFEquipo1: octavosFEquipo1?.length ? octavosFEquipo1[0] : null,
    octavosFEquipo2: octavosFEquipo2?.length ? octavosAEquipo2[0] : null,
    octavosGEquipo1: octavosGEquipo1?.length ? octavosGEquipo1[0] : null,
    octavosGEquipo2: octavosGEquipo2?.length ? octavosGEquipo2[0] : null,
    octavosHEquipo1: octavosHEquipo1?.length ? octavosHEquipo1[0] : null,
    octavosHEquipo2: octavosHEquipo2?.length ? octavosHEquipo2[0] : null,
    cuartosABEquipo1: cuartosABEquipo1?.length ? cuartosABEquipo1[0] : null,
    cuartosABEquipo2: cuartosABEquipo2?.length ? cuartosABEquipo2[0] : null,
    cuartosCDEquipo1: cuartosCDEquipo1?.length ? cuartosCDEquipo1[0] : null,
    cuartosCDEquipo2: cuartosCDEquipo2?.length ? cuartosCDEquipo2[0] : null,
    cuartosEFEquipo1: cuartosEFEquipo1?.length ? cuartosEFEquipo1[0] : null,
    cuartosEFEquipo2: cuartosEFEquipo2?.length ? cuartosEFEquipo2[0] : null,
    cuartosGHEquipo1: cuartosGHEquipo1?.length ? cuartosGHEquipo1[0] : null,
    cuartosGHEquipo2: cuartosGHEquipo2?.length ? cuartosGHEquipo2[0] : null,
    semifinal1Equipo1: semifinal1Equipo1?.length ? semifinal1Equipo1[0] : null,
    semifinal1Equipo2: semifinal1Equipo2?.length ? semifinal1Equipo2[0] : null,
    semifinal2Equipo1: semifinal2Equipo1?.length ? semifinal2Equipo1[0] : null,
    semifinal2Equipo2: semifinal2Equipo2?.length ? semifinal2Equipo2[0] : null,
    finalEquipo1: finalEquipo1?.length ? finalEquipo1[0] : null,
    finalEquipo2: finalEquipo2?.length ? finalEquipo2[0] : null,
    campeon: campeon?.length ? campeon[0] : null,
    activo: cuadroFinalDB.activo
  }
  return cuadroFinal
}

export const CrearActualizarCuadroFinal = async (idDisciplinaClub: number, payload: PayloadCuadroFinal): Promise<CuadroFinalConEquipos | null> => {
  const cuadroFinal = await ObtenerCuadroFinalActual(idDisciplinaClub)

  if (!cuadroFinal) {
    await CrearCuadroFinalBD(idDisciplinaClub, payload)
  } else {
    await ActualizarCuadroFinalBD(idDisciplinaClub, payload)
  }

  return await ObtenerCuadroFinalActual(idDisciplinaClub)
}
