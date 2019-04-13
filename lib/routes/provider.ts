import * as express from 'express';

import providerController from '../controllers/provider';

const router = express.Router();
router.get('/', providerController.getAll);
router.get('/:address', providerController.getByAddress);
router.get('/:city', providerController.getByCity);
router.get('/:state', providerController.getByState);
router.get('/:zip', providerController.getByZip);
<<<<<<< HEAD:lib/routes/provider.ts
router.get('/:providerName', providerController.getByName);
router.get('/:providerId', providerController.getByServiceProviderId);
router.post('/', providerController.create);
router.post('/login', providerController.login);
router.put('/:id', providerController.update);
router.delete('/:id', providerController.delete);
=======
router.get('/:phone', providerController.getByPhone);
router.get('/:email', providerController.getByEmail);
router.get('/:providerName', providerController.getByName);
router.get('/:providerId', providerController.getById);
router.post('/', providerController.create);
router.put('/:providerId', providerController.update);
router.delete('/:providerId', providerController.delete);
>>>>>>> 3820ada37b83efa57e4f5dae20adce841f7dc9e9:lib/routes/Provider.ts

export default router;
