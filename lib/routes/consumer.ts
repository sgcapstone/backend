import * as express from 'express';

import consumerController from '../controllers/consumer';

const router = express.Router();
router.get('/', consumerController.getAll);
router.get('/:customerId', consumerController.getByConsumerId);
router.post('/', consumerController.create);
router.post('/login', consumerController.login);
router.put('/:customerId', consumerController.update);
router.delete('/:customerId', consumerController.delete);

export default router;
