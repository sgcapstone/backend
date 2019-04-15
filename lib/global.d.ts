import {Model, Sequelize, SequelizeStatic} from 'sequelize';
import {ConsumerAttributes, ConsumerInstance} from './models/Consumer';
import {ProviderAttributes, ProviderInstance} from './models/Provider';
import {ServicesAttributes, ServicesInstance} from './models/Services';

declare global {
  type Consumer = ConsumerInstance;
  type Provider = ProviderInstance;
  type Service = ServicesInstance;

  // Define global model types
  interface Models {
    sequelize: Sequelize;
    Sequelize: SequelizeStatic;
    consumer: Model<ConsumerInstance, ConsumerAttributes>;
    provider: Model<ProviderInstance, ProviderAttributes>;
    service: Model<ServicesInstance, ServicesAttributes>;
  }
}
