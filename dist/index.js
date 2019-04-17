"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const boom = require("express-boom");
const DEVELOPMENT = 'development';
const env = process.env.NODE_ENV || DEVELOPMENT;
if (env === DEVELOPMENT) {
    dotenv.config();
}
const models_1 = require("./models");
const consumer_1 = require("./routes/consumer");
const health_1 = require("./routes/health");
const provider_1 = require("./routes/provider");
const service_1 = require("./routes/service");
const port = process.env.PORT || 4000;
const start = () => __awaiter(this, void 0, void 0, function* () {
    const models = models_1.getModels();
    try {
        yield models.sequelize.sync();
    }
    catch (error) {
        console.log('Failed to sync models', error);
    }
    const app = express();
    app.use(bodyParser.json());
    app.use(boom());
    app.use(cors());
    const prefix = '/api';
    app.use(prefix, health_1.default);
    app.use(`${prefix}/provider`, provider_1.default);
    app.use(`${prefix}/consumer`, consumer_1.default);
    app.use(`${prefix}/service`, service_1.default);
    app.use((req, res, next) => {
        res.boom.notFound();
    });
    app.listen(port, () => {
        console.log(`Running on ${port}.`);
    });
});
start();
//# sourceMappingURL=index.js.map