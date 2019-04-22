import * as bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';

import {getModels} from '../models';
import {sanatizeInData} from './misc';

const sanatizeService = (service: Service) => {
    const {...rest} = service.get({plain: true});
    return rest;
};

export default {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const services = await models.service.findAll();
        return res.status(200).json(services);
    },

    async count(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const count = await models.service.count();
        return res.status(200).json(count);
    },

    async create(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        if ((await models.service.count()) > 9998) {
            return res.boom.internal(
                'Database cannot accept more service providers until some are removed',
            );
        }

        const service = await models.service.create({
            ...sanatizeInData(req.body),
        });

        return res.status(201).json(sanatizeService(service));
    },

    async update(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const id = req.params.id;

        await models.service.update(sanatizeInData(req.body), {
            where: {id},
        });
        const updatedService = await models.service.findOne({
            where: {id},
        });

        return res.status(200).json(updatedService);

    },

    async delete(req: Request, res: Response, next: NextFunction) {
        const models = getModels();
        const id = req.params.id;
        await models.service.destroy({
            where: {id},
        });
        return res.status(200).end();
    },

};
