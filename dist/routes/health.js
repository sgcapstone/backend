"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const health_1 = require("../controllers/health");
const router = express.Router();
router.get('/ping', health_1.default.ping);
exports.default = router;
//# sourceMappingURL=health.js.map