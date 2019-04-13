import * as express from 'express';

import customerController from '../controllers/customer';

const router = express.Router();
router.get('/', customerController.getAll);
router.get('/:id', customerController.getByID);
router.get('/byCustId/:custId', customerController.getByCustId);
router.post('/', customerController.create);
router.post('/login', customerController.login);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);

export default router;
