import { Response } from 'express'
import { ObtenerJuagadoresParaDisciplinaClubCategoria } from '../manejadores/jugador'
import { RequestConUsuario } from '../middlewares/verifcarToken'

export const RutaObtenerJuagadoresParaDisciplinaClub = async (req: RequestConUsuario, res: Response) => {
    try {
        if (!req.params?.idDisciplinaClub && !req?.usuario?.idDisciplinaClub || req.params?.idDisciplinaClub && isNaN(Number(req.params.idDisciplinaClub))) {
            res.sendStatus(400)
            return
        }
        const idDisciplinaClub = req.params?.idDisciplinaClub ? parseInt(req.params.idDisciplinaClub) : req?.usuario?.idDisciplinaClub
        const idCategoria = req.params?.idCategoria ? parseInt(req.params.idCategoria) : undefined
        const jugadores = await ObtenerJuagadoresParaDisciplinaClubCategoria(idDisciplinaClub || -1, idCategoria)
        res.status(200).json(jugadores)
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
}
