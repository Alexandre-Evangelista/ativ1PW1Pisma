import express from 'express';
import cors from 'cors'

import { routes } from './routes';

const api = express();


api.use(express.json());
api.use(cors());
api.use(routes);

api.listen('3333', () => {
  console.log('server on port 3333')
});