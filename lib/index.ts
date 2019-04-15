import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as boom from 'express-boom';

const DEVELOPMENT = 'development';
const env = process.env.NODE_ENV || DEVELOPMENT;

if (env === DEVELOPMENT) {
  dotenv.config();
}

import {getModels} from './models';

import consumerRoutes from './routes/consumer';
import healthRoutes from './routes/health';
import providerRoutes from './routes/provider';
import serviceRoutes from './routes/service';

const port = process.env.PORT || 4000;

const start = async () => {
  const models = getModels();
  try {
    await models.sequelize.sync();
  } catch (error) {
    console.log('Failed to sync models', error);
  }

  const app = express();
  app.use(bodyParser.json());
  app.use(boom());
  app.use(cors());

  const prefix = '/api';
  app.use(prefix, healthRoutes);
  app.use(`${prefix}/provider`, providerRoutes);
  app.use(`${prefix}/consumer`, consumerRoutes);
  app.use(`${prefix}/service`, serviceRoutes);

  app.use((req, res, next) => {
    res.boom.notFound();
  });

  app.listen(port, () => {
    console.log(`Running on ${port}.`);
  });
};

start();
