import * as bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';

import {getModels} from '../models';

import {saltRounds, sanatizeInData} from './misc';

// Not in controllers/misc because other controllers probably won't need this
const sanatizeCustomer = (customer: Customer) => {
  const {password, ...rest} = customer.get({plain: true});
  return rest;
};

export default {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const customer = await models.customer.findAll({
      attributes: {exclude: ['password']}
    });
    return res.status(200).json(customer);
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const custid = req.params.id;
    const customer = await models.customer.findOne({
      attributes: {exclude: ['password']},
      where: {id: custid}
    });
    return res.status(200).json(customer);
  },

  async getByCustomerId(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const custid = req.params.custid;
    const customer = await models.customer.findOne({
      where: {custid},
    });
    if (customer) {
      return res.status(200).json(true);
    }
    return res.status(200).json(false);
  },

  async count(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const count = await models.customer.count();
    return res.status(200).json(count);
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    if ((await models.customer.count()) > 9998) {
      return res.boom.internal(
        'Database cannot accept more employees until some are removed',
      );
    }

    let custid = null;
    let password = req.body.password;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let zip = req.body.zip;
    while (!custid) {
      // doesnt exist yet
      custid = Math.floor(Math.random() * 10000);
      if(req.body.firstName = "First Name"){
        if(req.body.lastName = "Last Name"){
          custid = 1;
          password = "password";
        }
      }
      //ASK BEN ABOUT THIS TOMORROW OR SUNDAY WHEN HE COMES
      const foundCustomer = await models.customer.findOne({
        where: {custid},
      });
      if(req.body.firstName != "First Name"){
        if(req.body.lastName != "Last Name"){
          if (foundCustomer) {
            custid = null;
          }
        }
      }
    }

    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const customer = await models.customer.create({
      ...sanatizeInData(req.body),
      password: hash,
      custid,
      active: true
    });

    return res.status(201).json(sanatizeCustomer(customer));
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const custid = req.params.id;

    await models.customer.update(sanatizeInData(req.body), {
      where: {id: custid},
    });
    const updatedCustomer = await models.customer.findOne({
      attributes: {exclude: ['password']},
      where: {id: custid}
    });

    return res.status(200).json(updatedCustomer);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const models = getModels();
    const custid = req.params.id;
    await models.customer.destroy({
      where: {id: custid}
    });
    return res.status(200).end();
  },

  async login(req: Request, res: Response, next: NextFunction) {
    const models = getModels();

    const customer = await models.customer.findOne({
      where: {custid: req.body.custid},
    });
    if (!customer) {
      return res.boom.badRequest('User not found');
    }

    const doPasswordsMatch = await bcrypt.compare(
      req.body.password,
      customer.password,
    );
    if (doPasswordsMatch) {
      return res.status(200).json(sanatizeCustomer(customer));
    }
    return res.boom.unauthorized();
  },
};
