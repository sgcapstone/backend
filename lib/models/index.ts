import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

const postgresURI = process.env.POSTGRES_URI;
const models: any = {};

export const getModels = (): Models => {
  if (!postgresURI) {
    throw new Error('POSTGRES_URI is not defined');
  }

  if (Object.keys(models).length) {
    return models as Models;
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
    .filter(
      file =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js',
    )
    .forEach(file => {
      const model: any = sequelize.import(path.join(__dirname, file));
      models[model.name] = model;
    });

  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return models as Models;
};
