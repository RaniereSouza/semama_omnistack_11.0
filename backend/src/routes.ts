import express from 'express';

import OngController      from './controllers/OngController';
import IncidentController from './controllers/IncidentController';
import ProfileController  from './controllers/ProfileController';
import SessionController  from './controllers/SessionController';

export const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.post('/sessions', SessionController.create);

routes.get('/profile', ProfileController.index);