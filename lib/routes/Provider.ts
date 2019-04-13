import * as express from 'express';

import providerController from '../controllers/provider';

const router = express.Router();
router.get('/', providerController.getAll);
router.get('/:address', providerController.getByAddress);
router.get('/:city', providerController.getByCity);
router.get('/:state', providerController.getByState);
router.get('/:zip', providerController.getByZip);
router.get('/:phone', providerController.getByPhone);
router.get('/:email', providerController.getByEmail);
router.get('/:providerName', providerController.getByName);
router.get('/:providerId', providerController.getById);
router.post('/', providerController.create);
router.put('/:providerId', providerController.update);
router.delete('/:providerId', providerController.delete);

export default router;