import * as express from 'express';

import productController from '../controllers/product';

const router = express.Router();
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.get('/byLookupCode/:lookupCode', productController.getByLookupCode);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;
