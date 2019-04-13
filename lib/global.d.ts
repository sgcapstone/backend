import {Model, Sequelize, SequelizeStatic} from 'sequelize';

import {ConsumerAttributes, ConsumerInstance} from './models/Consumer';
import {EmployeeAttributes, EmployeeInstance} from './models/Employee';
import {ProductAttributes, ProductInstance} from './models/Product';
import {ProviderAttributes, ProviderInstance} from './models/Provider';

declare global {
  // type Employee = EmployeeInstance;
  // type Product = ProductInstance;
  type Consumer = ConsumerInstance;
  type Provider = ProviderInstance;
  // type Service = ServiceInstance;

  // Define global model types
  interface Models {
    sequelize: Sequelize;
    Sequelize: SequelizeStatic;
    // products: Model<ProductInstance, ProductAttributes>;
    // employees: Model<EmployeeInstance, EmployeeAttributes>;
    consumers: Model<ConsumerInstance, ConsumerAttributes>;
    providers: Model<ProviderInstance, ProviderAttributes>;
    // services: Model<ServiceInstance, ServiceAttributes>;
  }
}
