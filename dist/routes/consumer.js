"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const consumer_1 = require("../controllers/consumer");
const router = express.Router();
router.get('/', consumer_1.default.getAll);
router.get('/:customerId', consumer_1.default.getByConsumerId);
router.post('/', consumer_1.default.create);
router.post('/login', consumer_1.default.login);
router.put('/:customerId', consumer_1.default.update);
router.delete('/:customerId', consumer_1.default.delete);
exports.default = router;
//# sourceMappingURL=consumer.js.map