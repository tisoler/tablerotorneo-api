import { ObtenerCategoriasParaDisciplinaClubBD, CategoriaDB } from '../baseDatos/categoria'

export const ObtenerCategoriasParaDisciplinaClub = async (idDisciplinaClub: number): Promise<CategoriaDB[]> => {
  const categorias: CategoriaDB[] = await ObtenerCategoriasParaDisciplinaClubBD(idDisciplinaClub)
  if (!categorias?.length) {
    console.log(`No hay categorías para la disciplina club ${idDisciplinaClub}.`)
    return []
  }

  return categorias
}
