import express    from 'express';
import cors       from 'cors';
import dotenv     from 'dotenv';
import { errors } from 'celebrate';

import { routes } from './routes';

dotenv.config();

const app  = express(),
      port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(port, () => console.log(`listening on port ${port}...`));