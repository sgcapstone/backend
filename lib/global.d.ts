import {Model, Sequelize, SequelizeStatic} from 'sequelize';

import {EmployeeAttributes, EmployeeInstance} from './models/Employee';
import {ProductAttributes, ProductInstance} from './models/Product';

declare global {
  type Employee = EmployeeInstance;
  type Product = ProductInstance;

  // Define global model types
  interface Models {
    sequelize: Sequelize;
    Sequelize: SequelizeStatic;
    products: Model<ProductInstance, ProductAttributes>;
    employees: Model<EmployeeInstance, EmployeeAttributes>;
  }
}
