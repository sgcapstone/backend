"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const postgresURI = process.env.POSTGRES_URI;
const models = {};
exports.getModels = () => {
    if (!postgresURI) {
        throw new Error('POSTGRES_URI is not defined');
    }
    if (Object.keys(models).length) {
        return models;
    }
    const sequelize = new Sequelize(postgresURI, {
        dialect: 'postgres',
        native: false,
        pool: {
            idle: 10000,
            max: 10,
            min: 0,
        },
        operatorsAliases: false,
    });
    models.sequelize = sequelize;
    models.Sequelize = Sequelize;
    const basename = path.basename(module.filename);
    fs
        .readdirSync(__dirname)
        .filter(file => file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js')
        .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        models[model.name] = model;
    });
    Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
    return models;
};
//# sourceMappingURL=index.js.map