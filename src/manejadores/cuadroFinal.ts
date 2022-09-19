import { ActualizarCuadroFinalBD, CuadroFinalConEquipos, CuadroFinalDB, ObtenerCuadroFinalBD, PayloadCuadroFinal } from "../baseDatos/cuadroFinal"
import { EquipoDB, ObtenerEquipoBD } from "../baseDatos/equipo"

export const ObtenerCuadroFinal = async (): Promise<CuadroFinalConEquipos> => {
  const resultado: CuadroFinalDB[] = await ObtenerCuadroFinalBD()
  if (!resultado?.length) throw new Error('No hay cuadro final.')

  let cuadroFinalDB = resultado[0]

  const cuartosAEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosAEquipo1)
  const cuartosAEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosAEquipo2)
  const cuartosBEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosBEquipo1)
  const cuartosBEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosBEquipo2)
  const cuartosCEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosCEquipo1)
  const cuartosCEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosCEquipo2)
  const cuartosDEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosDEquipo1)
  const cuartosDEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.cuartosDEquipo2)
  const semifinalAEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.semifinalAEquipo1)
  const semifinalAEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.semifinalAEquipo2)
  const semifinalBEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.semifinalBEquipo1)
  const semifinalBEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.semifinalBEquipo2)
  const finalEquipo1: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.finalEquipo1)
  const finalEquipo2: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.finalEquipo2)
  const campeon: EquipoDB[] = await ObtenerEquipoBD(cuadroFinalDB.campeon)

  const cuadroFinal = {
    cuartosAEquipo1: cuartosAEquipo1?.length ? cuartosAEquipo1[0] : null,
    cuartosAEquipo2: cuartosAEquipo2?.length ? cuartosAEquipo2[0] : null,
    cuartosBEquipo1: cuartosBEquipo1?.length ? cuartosBEquipo1[0] : null,
    cuartosBEquipo2: cuartosBEquipo2?.length ? cuartosBEquipo2[0] : null,
    cuartosCEquipo1: cuartosCEquipo1?.length ? cuartosCEquipo1[0] : null,
    cuartosCEquipo2: cuartosCEquipo2?.length ? cuartosCEquipo2[0] : null,
    cuartosDEquipo1: cuartosDEquipo1?.length ? cuartosDEquipo1[0] : null,
    cuartosDEquipo2: cuartosDEquipo2?.length ? cuartosDEquipo2[0] : null,
    semifinalAEquipo1: semifinalAEquipo1?.length ? semifinalAEquipo1[0] : null,
    semifinalAEquipo2: semifinalAEquipo2?.length ? semifinalAEquipo2[0] : null,
    semifinalBEquipo1: semifinalBEquipo1?.length ? semifinalBEquipo1[0] : null,
    semifinalBEquipo2: semifinalBEquipo2?.length ? semifinalBEquipo2[0] : null,
    finalEquipo1: finalEquipo1?.length ? finalEquipo1[0] : null,
    finalEquipo2: finalEquipo2?.length ? finalEquipo2[0] : null,
    campeon: campeon?.length ? campeon[0] : null,
  }
  return cuadroFinal
}

export const ActualizarCuadroFinal = async (payload: PayloadCuadroFinal): Promise<CuadroFinalConEquipos> => {
  await ActualizarCuadroFinalBD(payload)

  return await ObtenerCuadroFinal()
}
