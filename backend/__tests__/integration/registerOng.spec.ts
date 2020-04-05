import request from 'supertest';

import connection from '../../src/db/connection';

import app from '../../src/app';

describe('Register ONG', () => {

    beforeAll(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback({}, true);
        await connection.destroy();
    });

    const testOng = {
        name:     'Test ONG',
        email:    'test@ong.com',
        whatsapp: '+5571000000000',
        city:     'Salvador',
        uf:       'BA'
    };
    let newId: string;

    it('should save a new ONG in the database and return it\'s ID', async () => {

        const res   = await request(app)
                            .post('/ongs')
                            .send(testOng);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toMatch(/[0-9A-Fa-f]{8}/);

        newId = res.body.id;
    });

    it('should find the newly registered ONG in the database table', async () => {

        expect(newId).toBeDefined();
        
        const res   = await connection('ongs')
                            .where('id', newId)
                            .select('*')
                            .first();

        expect(res).toMatchObject({...testOng, id: newId});
    });
});