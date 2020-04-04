import { Request, Response } from 'express';

import connection from '../db/connection';

import generateUniqueId from '../utils/generateUniqueId';

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
        id = generateUniqueId();

        try {

            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            });

            return res.status(201).json({ id });
        }
        catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`);
            return res.status(400).json({error: err.message || err.details || err.status || err});
        }
    }
}

export default new OngController();