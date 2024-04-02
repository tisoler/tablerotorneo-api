import { Response } from 'express'
import { ObtenerCategoriasParaDisciplinaClub } from '../manejadores/categoria'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerCategoriasParaDisciplinaClub = async (req: RequestConUsuario, res: Response) => {
    try {
        if (!req.params?.idDisciplinaClub && !req?.usuario?.idDisciplinaClub || req.params?.idDisciplinaClub && isNaN(Number(req.params.idDisciplinaClub))) {
        res.sendStatus(400)
        return
        }
        const idDisciplinaClub = req.params?.idDisciplinaClub ? parseInt(req.params.idDisciplinaClub) : req?.usuario?.idDisciplinaClub
        const categorias = await ObtenerCategoriasParaDisciplinaClub(idDisciplinaClub || -1)
        res.status(200).json(categorias)
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
}
