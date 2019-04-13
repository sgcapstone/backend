import * as express from 'express';

import providerController from '../controllers/provider';

const router = express.Router();
router.get('/', providerController.getAll);
router.get('/:address', providerController.getByAddress);
router.get('/:city', providerController.getByCity);
router.get('/:state', providerController.getByState);
router.get('/:zip', providerController.getByZip);
router.get('/:providerName', providerController.getByName);
router.get('/:providerId', providerController.getByServiceProviderId);
router.post('/', providerController.create);
router.post('/login', providerController.login);
router.put('/:id', providerController.update);
router.delete('/:id', providerController.delete);

export default router;
