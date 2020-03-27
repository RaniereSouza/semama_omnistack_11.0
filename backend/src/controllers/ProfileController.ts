import { Request, Response } from 'express';

import connection from '../db/connection';

class ProfileController {

    async index (req: Request, res: Response) {

        const { authorization:ong_id } = req.headers;

        const incidents = await connection('incidents')
                                .where('ong_id', ong_id)
                                .select('*');

        return res.json(incidents);
    }
}

export default new ProfileController();