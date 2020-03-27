import express from 'express';
import cors    from 'cors';

import { routes } from './routes';

const dotenv = require('dotenv').config(),
      app    = express(),
      port   = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`listening on port ${port}...`));