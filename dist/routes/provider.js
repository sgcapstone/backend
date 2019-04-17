"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const provider_1 = require("../controllers/provider");
const router = express.Router();
router.get('/', provider_1.default.getAll);
router.get('/city/:city', provider_1.default.getByCity);
router.get('/name/:providerName', provider_1.default.getByName);
router.get('/service/:service', provider_1.default.getByService);
router.get('/:providerId', provider_1.default.getByProviderId);
router.post('/', provider_1.default.create);
router.post('/login', provider_1.default.login);
router.put('/:providerId', provider_1.default.update);
router.delete('/:providerId', provider_1.default.delete);
exports.default = router;
//# sourceMappingURL=provider.js.map