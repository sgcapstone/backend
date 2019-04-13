import * as express from 'express';

import customerController from '../controllers/consumer';

const router = express.Router();
router.get('/', customerController.getAll);
router.get('/:customerId', customerController.getByConsumerId);
router.post('/', customerController.create);
router.post('/login', customerController.login);
router.put('/:customerId', customerController.update);
router.delete('/:customerId', customerController.delete);

export default router;
