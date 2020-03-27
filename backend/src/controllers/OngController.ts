import crypto                from 'crypto';
import { Request, Response } from 'express';

import connection from '../db/connection';

class OngController {

    async index (req: Request, res: Response) {

        const ongs = await connection('ongs').select('*');
    
        return res.json(ongs);
    }

    async create (req: Request, res: Response) {

        const   {
            name,
            email,
            whatsapp,
            city,
            uf
        }  = req.body,
        id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return res.json({ id });
    }
}

export default new OngController();