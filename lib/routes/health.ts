import * as express from 'express';

import healthController from '../controllers/health';

const router = express.Router();
router.get('/ping', healthController.ping);

export default router;
