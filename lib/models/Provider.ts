import * as Sequelize from 'sequelize';

import {tableMeta, tables} from '../constants';
import {role} from './enums/role';

export interface ProviderAttributes {
  providerName?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: number;
  providerId?: number;
  role?: string;
  phone?: string;
  email?: string;
}

export interface ProviderInstance
  extends Sequelize.Instance<ProviderAttributes> {
  providerName: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  providerId: number;
  role: string;
  phone: string;
  email: string;
}

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
) => {
  const Provider: any = sequelize.define(tables.provider, {
    ...tableMeta,
    providerName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'provider_name',
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'address',
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'city',
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'state',
    },
    zip: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'zip',
    },
    providerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'provider_id',
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM(
        role.CUSTOMER,
        role.SERVICE_PROVIDER,
      ),
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'phone',
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'email',
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  /*Employee.associate = (models: Models) => {
    Employee.belongsTo(models.employees, {
      as: 'manager',
      foreignKey: {
        allowNull: true,
        field: 'manager_id',
      },
    });
  };*/

  return Provider;
};
