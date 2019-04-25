import * as express from 'express';

import providerController from '../controllers/provider';

const router = express.Router();
router.get('/', providerController.getAll);
router.get('/city/:city', providerController.getByCity);
router.get('/name/:providerName', providerController.getByName);
router.get('/service/:service', providerController.getByService);
router.get('/services/:providerId', providerController.getServiceByProvider);
router.get('/count/', providerController.count);
router.get('/:providerId', providerController.getByProviderId);
router.post('/', providerController.create);
router.post('/login', providerController.login);
router.put('/:providerId', providerController.update);
router.delete('/:providerId', providerController.delete);

export default router;
