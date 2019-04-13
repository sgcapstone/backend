import * as brcypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';

import {getModels} from '../models';
import {role} from '../models/enums/role';

import {saltRounds, sanatizeInData} from './misc';

const sanatizeProvider = (provider: provider) => {
    const {password, ...rest} = service.get({plain: true});
    return rest;
};

export default {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const providers = await models.providers.findAll({
            attributes: {exclude: ['password']}
        });
        return res.status(200).json(providers);
    },

    // get function for address
    async getByAddress(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerAddress = req.params.address;
        const provider = await models.providers.findAll({
            where: {address: providerAddress}
        });
        return res.status(200).json(provider);
    },

    // get function for city
    async getByCity(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerCity = req.params.city;
        const provider = await models.providers.findAll({
            where: {city: providerCity}
        });
        return res.status(200).json(provider);
    },

    // get function for state
    async getByState(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerState = req.params.state;
        const provider = await models.providers.findAll({
            where: {state: providerState}
        });
        return res.status(200).json(provider);
    },


    // get function for zip
    async getByZip(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerZip = req.params.zip;
        const provider = await models.providers.findAll({
            where: {zip: providerZip}
        });
        return res.status(200).json(provider);
    },

    // get function for phone
    async getByPhone(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerPhone = req.params.phone;
        const provider = await models.providers.findAll({
            where: {phone: providerPhone}
        });
        return res.status(200).json(provider);
    },

    // get function for email
    async getByEmail(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerEmail = req.params.email;
        const provider = await models.providers.findAll({
            where: {email: providerEmail}
        });
        return res.status(200).json(provider);
    },

    // get function for provider name
    async getByName(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerNa = req.params.providerName;
        const provider = await models.providers.findAll({
            where: {providername: providerNa}
        });
        return res.status(200).json(provider);
    },

    async getById(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerI = req.params.providerId;
        const provider = await models.providers.findOne({
            where: {providerI},
        });
        if (provider) {
            return res.status(200).json(true);
        }
        return res.status(200).json(false);
    },

    async count(req: Request, res: Response, next: NextFunction) {
        const models = getModel();
        const count = await models.providers.count();
        return res.status(200).json(count);
    },

    async create(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        if((await models.providers.count()) > 9998) {
            return res.boom.internal(
                'Database cannot accept more service providers until some are removed',
            );
        }

        let providerId = null;
        let password = req.body.password;
        let name = req.body.name;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.bpdy.state;
        let zip = req.body.zip;
        let review = req.body.review;



        while (!providerId) {
            // doesnt exist yet
            providerId = Math.floor(Math.random() * 10000);
            if(req.body.providerNa = "providerName"){
                if(req.body.address = "address"){
                    if(req.body.city = "city"){
                        if(req.body.state = "state"){
                            if(req.body.zip = "zip"){
                                if(req.body.phone = "phone"){
                                    if(req.body.email = "email"){
                                        providerId = 1;
                                        password = "password";
                                    }
                                }
                            }
                        }
                    }
                }
            }

            const foundProvider = await models.providers.findOne({
                where: {providerId},
            });
            if(req.body.name != "Name"){
                if(req.body.address != "address"){
                    if(req.body.city != "city"){
                        if(req.body.state != "state"){
                            if(req.body.zip != "zip"){
                                if(req.body.phone != "phone"){
                                    if(req.body.phone != "email"){
                                        if(foundProvider){
                                            providerId = null;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const provider = await models.providers.create({
            ...sanatizeInData(req.body),
        });

        return res.status(201).json(sanatizeProvider(provider));
    },

    async update(req: Request, res: Response, next: NextFunction){
        const models = getModels();
        const providerI = req.params.provideId;

        await models.providers.update(sanatizeInData(req.body), {
            where: {provideId: providerI},
        });
        const updatedProvider = await models.providers.findOne({
            attributes: {exclude: ['password']},
            where: {providerId: providerI}
        });

        return res.status(200).json(updatedProvider);

    },

    async delete(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const providerI = req.params.providerId;
        await models.providers.destroy({
            where: {providerId: providerI}
        });
        return res.status(200).end();
    },

    async login(req: Request, res: Response, next: NextFunction) {
        const models = getModels();

        const provider = await models.providers.findOne({
            where: {providerId: req.body.providerI},
        });
        if (!provider) {
            return res.boom.badRequest('provider not found');
        }

        const doPasswordsMatch = await bcrypt.compare(
            req.body.password,
            provider.password,
        );
        if (doPasswordsMatch) {
            return res.status(200).json(sanatizeProvider(provider));
        }
        return res.boom.unauthorized();
    },


};
