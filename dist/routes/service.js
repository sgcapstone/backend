"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const service_1 = require("../controllers/service");
const router = express.Router();
router.get('/', service_1.default.getAll);
router.post('/', service_1.default.create);
router.put('/:id', service_1.default.update);
router.delete('/:id', service_1.default.delete);
exports.default = router;
//# sourceMappingURL=service.js.map