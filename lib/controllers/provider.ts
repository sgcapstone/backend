import * as bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';

import {getModels} from '../models';
import {saltRounds, sanatizeInData} from './misc';

const sanatizeProvider = (providers: Provider) => {
    const {password, ...rest} = providers.get({plain: true});
    return rest;
};

export default {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const providers = await models.providers.findAll({
            attributes: {exclude: ['password']},
        });
        return res.status(200).json(providers);
    },

    // get function for city
    async getByCity(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const city = req.params.city;
        const provider = await models.providers.findAll({
            where: {city},
        });
        return res.status(200).json(provider);
    },

    // get function for provider name
    async getByName(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const providerName = req.params.providerName;
        const provider = await models.providers.findAll({
            where: {providerName},
        });
        return res.status(200).json(provider);
    },

    // get function for provider name
    async getByService(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const providerName = req.params.providerName;
        const provider = await models.providers.findAll({
            where: {providerName},
        });
        return res.status(200).json(provider);
    },

    // get function for provider name
    async getByProviderId(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const providerId = req.params.providerId;
        const provider = await models.providers.findAll({
            where: {providerId},
        });
        return res.status(200).json(provider);
    },

    async count(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const count = await models.providers.count();
        return res.status(200).json(count);
    },

    async create(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        if ((await models.providers.count()) > 9998) {
            return res.boom.internal(
                'Database cannot accept more service providers until some are removed',
            );
        }

        let providerId = null;
        let password = req.body.password;

        while (!providerId) {
            // doesnt exist yet
            providerId = Math.floor(Math.random() * 10000);
            if (req.body.providerName === 'providerName') {
                providerId = 1;
                password = 'password';
            }

            const foundProvider = await models.providers.findOne({
                where: {providerId},
            });
            if (req.body.providerName !== 'providerName') {
                if (foundProvider) {
                    providerId = null;
                }
            }
        }

        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const provider = await models.providers.create({
            ...sanatizeInData(req.body),
            password: hash,
            providerId,
        });

        return res.status(201).json(sanatizeProvider(provider));
    },

    async update(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const providerI = req.params.provideId;

        await models.providers.update(sanatizeInData(req.body), {
            where: {provideId: providerI},
        });
        const updatedProvider = await models.providers.findOne({
            attributes: {exclude: ['password']},
            where: {providerId: providerI},
        });

        return res.status(200).json(updatedProvider);

    },

    async delete(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const providerI = req.params.providerId;
        await models.providers.destroy({
            where: {providerId: providerI},
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
