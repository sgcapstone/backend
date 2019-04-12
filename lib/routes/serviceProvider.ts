import * as express from 'express';

import serviceProviderController from '../controllers/serviceProvider';

const router = express.Router();
router.get('/', serviceProviderController.getAll);
router.get('/:address', serviceProviderController.address);
router.get('/:city', serviceProviderController.city);
router.get('/:state', serviceProviderController.state);
router.get('/:zip', serviceProviderController.zip);
router.get('/:review', serviceProviderController.review);
router.get('/:name', serviceProviderController.name);
router.get('/:businessid', serviceProviderController.getById);
router.get('/byLookupCode/:lookupCode', serviceProviderController.getByLookupCode);
router.post('/', serviceProviderController.create);
router.put('/:id', serviceProviderController.update);
router.delete('/:id', serviceProviderController.delete);

export default router;