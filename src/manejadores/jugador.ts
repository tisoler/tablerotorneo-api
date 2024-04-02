import { ObtenerJuagadoresParaDisciplinaClubCategogiaBD, JugadorDB } from '../baseDatos/jugador'

export const ObtenerJuagadoresParaDisciplinaClubCategoria = async (idDisciplinaClub: number, idCategoria?: number): Promise<JugadorDB[]> => {
  const jugadores: JugadorDB[] = await ObtenerJuagadoresParaDisciplinaClubCategogiaBD(idDisciplinaClub, idCategoria)
  if (!jugadores?.length) {
    console.log(`No hay jugadores para la disciplina club ${idDisciplinaClub}.`)
    return []
  }

  // Calcular ranking
  let ranking = 0;
  let puntosRanking = -1;
  jugadores.sort((a, b) => {
    if (a.puntos > b.puntos) return -1
    if (a.puntos < b.puntos) return 1
		if (a.apellido > b.apellido) return 1
		if (a.apellido < b.apellido) return -1
		if (a.nombre > b.nombre) return 1
		return -1
  }).forEach((jugador: JugadorDB, idx: number) => {
    if (jugador.puntos !== puntosRanking) {
			puntosRanking = jugador.puntos
			ranking = idx + 1
    }
    jugador.ranking = ranking  
  })

  return jugadores
}
