import { Request, Response } from 'express';

import connection from '../db/connection';

class IncidentController {

    async index (req: Request, res: Response) {

        const { page = 1 } = req.query;

        const [ count ] = await connection('incidents')
                                .count(),
              incidents = await connection('incidents')
                                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                                .limit(5)
                                .offset((page - 1) * 5)
                                .select([
                                    'incidents.*',
                                    'ongs.name',
                                    'ongs.email',
                                    'ongs.whatsapp',
                                    'ongs.city',
                                    'ongs.uf'
                                ]);

        res.header('X-Total-Count', count["count(*)"]);
    
        return res.json(incidents);
    }

    async create (req: Request, res: Response) {

        const   {
                    title,
                    description,
                    value
                } = req.body,
                {
                    authorization:ong_id
                } = req.headers;
        
        try {
            
            const [ id ] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            });

            return res.status(201).json({ id });
        }
        catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`);
            return res.status(400).json({error: err.message || err.details || err.status || err});
        }
    }

    async delete (req: Request, res: Response) {

        const { id }                   = req.params,
              { authorization:ong_id } = req.headers;
        
        const incident = await connection('incidents')
                               .where('id', id)
                               .select('ong_id')
                               .first();
        
        if (!incident)
            return res.status(404).json({error: 'Incident not found.'});
        else if (incident.ong_id !== ong_id)
            return res.status(401).json({error: 'Operation unauthorized.'});

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}

export default new IncidentController();