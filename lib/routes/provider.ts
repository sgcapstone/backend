import * as express from 'express';

import providerController from '../controllers/provider';

const router = express.Router();
router.get('/', providerController.getAll);
router.get('/:city', providerController.getByCity);
router.get('/:providerName', providerController.getByName);
router.get('/:service', providerController.getByService);
router.get('/:providerId', providerController.getByProviderId);
router.post('/', providerController.create);
router.post('/login', providerController.login);
router.put('/:id', providerController.update);
router.delete('/:id', providerController.delete);

export default router;
