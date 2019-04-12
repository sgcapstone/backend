import * as express from 'express';

import serviceProviderController from '../controllers/serviceProvider';

const router = express.Router();
router.get('/', serviceProviderController.getAll);
router.get('/:id', serviceProviderController.getById);
router.get('/byLookupCode/:lookupCode', serviceProviderController.getByLookupCode);
router.post('/', serviceProviderController.create);
router.put('/:id', serviceProviderController.update);
router.delete('/:id', serviceProviderController.delete);

export default router;