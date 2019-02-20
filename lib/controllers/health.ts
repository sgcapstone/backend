import {NextFunction, Request, Response} from 'express';

import {getModels} from '../models';

export default {
  async ping(req: Request, res: Response, next: NextFunction) {
    return res.status(200).send('pong');
  },
};
