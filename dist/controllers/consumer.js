"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const models_1 = require("../models");
const misc_1 = require("./misc");
// Not in controllers/misc because other controllers probably won't need this
const sanatizeConsumer = (consumers) => {
    const _a = consumers.get({ plain: true }), { password } = _a, rest = __rest(_a, ["password"]);
    return rest;
};
exports.default = {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const consumers = yield models.consumer.findAll({
                attributes: { exclude: ['password'] },
            });
            return res.status(200).json(consumers);
        });
    },
    getByConsumerId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const customerId = req.params.customerId;
            const consumer = yield models.consumer.findOne({
                where: { customerId },
            });
            return res.status(200).json(consumer);
        });
    },
    count(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const count = yield models.consumer.count();
            return res.status(200).json(count);
        });
    },
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            if ((yield models.consumer.count()) > 9998) {
                return res.boom.internal('Database cannot accept more customers until some are removed');
            }
            let customerId = null;
            let password = req.body.password;
            while (!customerId) {
                // doesnt exist yet
                customerId = Math.floor(Math.random() * 10000);
                if (req.body.firstName === 'First') {
                    if (req.body.lastName === 'Last') {
                        customerId = 1;
                        password = 'password';
                    }
                }
                const foundConsumer = yield models.consumer.findOne({
                    where: { customerId },
                });
                if (req.body.firstName !== 'First') {
                    if (req.body.lastName !== 'Last') {
                        if (foundConsumer) {
                            customerId = null;
                        }
                    }
                }
            }
            const hash = yield bcrypt.hash(req.body.password, misc_1.saltRounds);
            const consumer = yield models.consumer.create(Object.assign({}, misc_1.sanatizeInData(req.body), { password: hash, customerId }));
            return res.status(201).json(sanatizeConsumer(consumer));
        });
    },
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const customerId = req.params.ConsumerId;
            yield models.consumer.update(misc_1.sanatizeInData(req.body), {
                where: { customerId },
            });
            const updatedConsumer = yield models.consumer.findOne({
                attributes: { exclude: ['password'] },
                where: { customerId },
            });
            return res.status(200).json(updatedConsumer);
        });
    },
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const customerId = req.params.customerId;
            yield models.consumer.destroy({
                where: { customerId },
            });
            return res.status(200).end();
        });
    },
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const consumer = yield models.consumer.findOne({
                where: { customerId: req.body.customerId },
            });
            if (!consumer) {
                return res.boom.badRequest('User not found');
            }
            const doPasswordsMatch = yield bcrypt.compare(req.body.password, consumer.password);
            if (doPasswordsMatch) {
                return res.status(200).json(sanatizeConsumer(consumer));
            }
            return res.boom.unauthorized();
        });
    },
};
//# sourceMappingURL=consumer.js.map