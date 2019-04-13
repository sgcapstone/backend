import * as express from 'express';

import providerController from '../controllers/provider';

const router = express.Router();
router.get('/', providerController.getAll);
router.get('/:address', providerController.getByAddress);
router.get('/:city', providerController.getByCity);
router.get('/:state', providerController.getByState);
router.get('/:zip', providerController.getByZip);
router.get('/:review', providerController.getByReview);
router.get('/:providername', providerController.getByame);
router.get('/:businessid', providerController.getById);
router.post('/', providerController.create);
router.put('/:id', providerController.update);
router.delete('/:id', providerController.delete);

export default router;