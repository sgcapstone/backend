import * as express from 'express';

import serviceController from '../controllers/service';

const router = express.Router();
router.get('/', serviceController.getAll);
router.post('/', serviceController.create);
router.put('/:id', serviceController.update);
router.delete('/:id', serviceController.delete);

export default router;
