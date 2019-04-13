import * as bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';

import {getModels} from '../models';

import {saltRounds, sanatizeInData} from './misc';

// Not in controllers/misc because other controllers probably won't need this
const sanatizeConsumer = (consumers: Consumer) => {
  const {password, ...rest} = consumers.get({plain: true});
  return rest;
};

export default {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const consumers = await models.consumers.findAll({
      attributes: {exclude: ['password']},
    });
    return res.status(200).json(consumers);
  },

  async getByConsumerId(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const customerId = req.params.customerId;
    const consumer = await models.consumers.findOne({
      where: {customerId},
    });
    if (consumer) {
      return res.status(200).json(true);
    }
    return res.status(200).json(false);
  },

  async count(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const count = await models.consumers.count();
    return res.status(200).json(count);
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    if ((await models.consumers.count()) > 9998) {
      return res.boom.internal(
        'Database cannot accept more customers until some are removed',
      );
    }

    let customerId = null;
    let password = req.body.password;
    while (!customerId) {
      // doesnt exist yet
      customerId = Math.floor(Math.random() * 10000);
      if (req.body.firstName === 'First') {
        if (req.body.lastName === 'Last') {
          customerId = 1;
          password = 'password';
        }
      }
      const foundConsumer = await models.consumers.findOne({
        where: {customerId},
      });
      if (req.body.firstName !== 'First') {
        if (req.body.lastName !== 'Last') {
          if (foundConsumer) {
            customerId = null;
          }
        }
      }
    }

    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const consumer = await models.consumers.create({
      ...sanatizeInData(req.body),
      password: hash,
      customerId,
    });

    return res.status(201).json(sanatizeConsumer(consumer));
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const customerId = req.params.id;

    await models.consumers.update(sanatizeInData(req.body), {
      where: {id: customerId},
    });
    const updatedConsumer = await models.consumers.findOne({
      attributes: {exclude: ['password']},
      where: {id: customerId},
    });

    return res.status(200).json(updatedConsumer);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const customerId = req.params.id;
    await models.consumers.destroy({
      where: {id: customerId},
    });
    return res.status(200).end();
  },

  async login(req: Request, res: Response, next: NextFunction) {
    const models = getModels();

    const consumer = await models.consumers.findOne({
      where: {customerId: req.body.customerId},
    });
    if (!consumer) {
      return res.boom.badRequest('User not found');
    }

    const doPasswordsMatch = await bcrypt.compare(
      req.body.password,
      consumer.password,
    );
    if (doPasswordsMatch) {
      return res.status(200).json(sanatizeConsumer(consumer));
    }
    return res.boom.unauthorized();
  },
};
