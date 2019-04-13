import * as brcypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';

import {getModels} from '../models';
import {role} from '../models/enums/role';

import {saltRounds, sanatizeInData} from './misc';

const sanatizeServiceProvider = (serviceProvider: ServiceProvider) => {
    const {password, ...rest} = service.get({plain: true});
    return rest;
};
// testing
export default {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const serviceProviders = await models.serviceProviders.findAll({
            attributes: {exclude: ['password']}
        });
        return res.status(200).json(serviceProviders);
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const serviceProviderId = req.params.id;
        const serviceProvider = await models.serviceProviders.findOne({
            attributes: {exclude: ['password']},
            where: {id: serviceProviderId}
        });
        return res.status(200).json(serviceProvider);
    },

    async getByServiceProviderId(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const serviceProviderId = req.params.serviceProviderId;
        const serviceProvider = await models.serviceProviders.findOne({
            where: {serviceProviderId},
        });
        if (serviceProvider) {
            return res.status(200).json(true);
        }
        return res.status(200).json(false);
    },

    async count(req: Request, res: Response, next: NextFunction) {
        const models = getModel();
        const count = await models.serviceProviders.count();
        return res.status(200).json(count);
    },

    async create(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        if((await models.serviceProviders.count()) > 9998) {
            return res.boom.internal(
                'Database cannot accept more service providers until some are removed',
            );
        }

        let serviceProviderId = null;
        let password = req.body.password;
        let name = req.body.name;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.bpdy.state;
        let zip = req.body.zip;
        let review = req.body.review;



        while (!serviceProviderId) {
            // doesnt exist yet
            serviceProviderId = Math.floor(Math.random() * 10000);
            if(req.body.name = "Name"){
                if(req.body.address = "address"){
                    if(req.body.city = "city"){
                        if(req.body.state = "state"){
                            if(req.body.zip = "zip"){
                                if(req.body.review = "review"){
                                    serviceProviderId = 1;
                                    password = "password";
                                }
                            }
                        }
                    }
                }
            }

            const foundServiceProvider = await models.serviceProviders.findOne({
                where: {serviceProviderId},
            });
            if(req.body.name != "Name"){
                if(req.body.address != "address"){
                    if(req.body.city != "city"){
                        if(req.body.state != "state"){
                            if(req.body.zip != "zip"){
                                if(req.body.review != "review"){
                                    if(foundServiceProvider){
                                        serviceProviderId = null;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const serviceProvider = await models.serviceProviders.create({
            ...sanatizeInData(req.body),
            password: hash,
            serviceProviderId,
            active: true,
            role: role.CASHIER, <---?
        });

        return res.status(201).json(sanatizeServiceProvider(serviceProvider));
    },

    async update(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const serviceProviderId = req.params.id;

        await models.serviceProviders.update(sanatizeInData(req.body), {
            where: {id: serviceProviderId},
        });
        const updatedServiceProvider = await models.serviceProviders.findOne({
            attributes: {exclude: ['password']},
            where: {id: serviceProviderId}
        });

        return res.status(200).json(updatedServiceProvider);

    },


    async delete(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const serviceProviderId = req.params.id;
        await models.serviceProviders.destroy({
            where: {id: serviceProviderId}
        });
        return res.status(200).end();
    },

    async login(req: Request, res: Response, next: NextFunction) {
        const models = getModels();

        const serviceProvider = await models.serviceProviders.findOne({
            where: {serviceProviderId: req.body.serviceProviderId},
        });
        if (!serviceProvider) {
            return res.boom.badRequest('serviceProvider not found');
        }

        const doPasswordsMatch = await bcrypt.compare(
            req.body.password,
            serviceProvider.password,
        );
        if (doPasswordsMatch) {
            return res.status(200).json(sanatizeServiceProvider(serviceProvider));
        }
        return res.boom.unauthorized();
    },
};