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
const models_1 = require("../models");
const misc_1 = require("./misc");
const sanatizeService = (service) => {
    const rest = __rest(service.get({ plain: true }), []);
    return rest;
};
exports.default = {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const services = yield models.service.findAll();
            return res.status(200).json(services);
        });
    },
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            if ((yield models.service.count()) > 9998) {
                return res.boom.internal('Database cannot accept more service providers until some are removed');
            }
            const service = yield models.service.create(Object.assign({}, misc_1.sanatizeInData(req.body)));
            return res.status(201).json(sanatizeService(service));
        });
    },
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const id = req.params.id;
            yield models.service.update(misc_1.sanatizeInData(req.body), {
                where: { id },
            });
            const updatedService = yield models.service.findOne({
                where: { id },
            });
            return res.status(200).json(updatedService);
        });
    },
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = models_1.getModels();
            const id = req.params.id;
            yield models.service.destroy({
                where: { id },
            });
            return res.status(200).end();
        });
    },
};
//# sourceMappingURL=service.js.map