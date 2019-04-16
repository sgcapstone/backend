import * as Sequelize from 'sequelize';
import {tableMeta, tables} from '../constants';

export interface ConsumerAttributes {
    id?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: number;
    name?: string;
    password?: string;
    customerId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ConsumerInstance
    extends Sequelize.Instance < ConsumerAttributes > {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    password: string;
    customerId: number;
    createdAt: string;
    updatedAt: string;
}

export default function(
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
) {
    const Consumer: any = sequelize.define(tables.consumers, {
        ...tableMeta,
        firstName: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'first_name',
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'last_name',
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
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        customerId: {
            allowNull: false,
            unique: true,
            type: DataTypes.INTEGER,
            field: 'customer_id',
        },
    });

    return Consumer;
}
