import * as Sequelize from 'sequelize';
import {tableMeta, tables} from '../constants';

export interface ProviderAttributes {
  id?: string;
  providerName?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: number;
  providerId?: number;
  phone?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProviderInstance
  extends Sequelize.Instance<ProviderAttributes> {
  id: string;
  providerName: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  providerId: number;
  phone: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function(
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
) {
  const Provider: any = sequelize.define(tables.providers, {
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

  return Provider;
}
