import * as express from 'express';

import customerController from '../controllers/consumer';

const router = express.Router();
router.get('/', customerController.getAll);
router.get('/:customerid', customerController.getByConsumerId);
router.post('/', customerController.create);
router.post('/login', customerController.login);
router.put('/:customerid', customerController.update);
router.delete('/:customerid', customerController.delete);

export default router;
