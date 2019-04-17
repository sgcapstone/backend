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
const sanatizeProvider = (providers) => {
    const _a = providers.get({ plain: true }), { password } = _a, rest = __rest(_a, ["password"]);
    return rest;
};
exports.default = {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const providers = yield models.provider.findAll({
                attributes: { exclude: ['password'] },
            });
            return res.status(200).json(providers);
        });
    },
    // get function for city
    getByCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const city = req.params.city;
            const provider = yield models.provider.findAll({
                where: { city },
            });
            return res.status(200).json(provider);
        });
    },
    // get function for provider name
    getByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const providerName = req.params.providerName;
            const provider = yield models.provider.findAll({
                where: { providerName },
            });
            return res.status(200).json(provider);
        });
    },
    // get function for service
    getByService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const serviceName = req.params.service;
            const services = yield models.service.findAll({
                where: { serviceName },
            });
            const providers = [];
            for (const service of services) {
                providers.push(yield models.provider.findOne({
                    where: { providerId: service.providerId },
                }));
            }
            return res.status(200).json(providers);
        });
    },
    // get function for provider name
    getByProviderId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const providerId = req.params.providerId;
            const provider = yield models.provider.findAll({
                where: { providerId },
            });
            return res.status(200).json(provider);
        });
    },
    count(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const count = yield models.provider.count();
            return res.status(200).json(count);
        });
    },
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            if ((yield models.provider.count()) > 9998) {
                return res.boom.internal('Database cannot accept more service providers until some are removed');
            }
            let providerId = null;
            let password = req.body.password;
            while (!providerId) {
                // doesnt exist yet
                providerId = Math.floor(Math.random() * 10000);
                if (req.body.providerName === 'providerName') {
                    providerId = 1;
                    password = 'password';
                }
                const foundProvider = yield models.provider.findOne({
                    where: { providerId },
                });
                if (req.body.providerName !== 'providerName') {
                    if (foundProvider) {
                        providerId = null;
                    }
                }
            }
            const hash = yield bcrypt.hash(req.body.password, misc_1.saltRounds);
            const provider = yield models.provider.create(Object.assign({}, misc_1.sanatizeInData(req.body), { password: hash, providerId }));
            return res.status(201).json(sanatizeProvider(provider));
        });
    },
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const providerId = req.params.providerId;
            yield models.provider.update(misc_1.sanatizeInData(req.body), {
                where: { providerId },
            });
            const updatedProvider = yield models.provider.findOne({
                attributes: { exclude: ['password'] },
                where: { providerId },
            });
            return res.status(200).json(updatedProvider);
        });
    },
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const providerId = req.params.providerId;
            yield models.provider.destroy({
                where: { providerId },
            });
            return res.status(200).end();
        });
    },
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const provider = yield models.provider.findOne({
                where: { providerId: req.body.providerId },
            });
            if (!provider) {
                return res.boom.badRequest('provider not found');
            }
            const doPasswordsMatch = yield bcrypt.compare(req.body.password, provider.password);
            if (doPasswordsMatch) {
                return res.status(200).json(sanatizeProvider(provider));
            }
            return res.boom.unauthorized();
        });
    },
};
//# sourceMappingURL=provider.js.map