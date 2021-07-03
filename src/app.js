import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { port } from './config';

import routes from './routes';

import { handleNotFound, handleError } from './middlewares/errors.middleware';

const app = express();

// config
app.set('port', port);

//middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', routes);

// errors
app.use(handleError);
app.use(handleNotFound);

export default app;
