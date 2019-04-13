import * as Sequelize from 'sequelize';

import {tableMeta, tables} from '../constants';
import {role} from '../enums/role';

export interface ConsumerAttributes{
    id?: string;
    firstname?: string;
    lastname?: string;
    address?: string;
    city?: string;
    zip?: number;
    state?: string;
    name?: string;
    active?: boolean;
    role?: role;
    password?: string;
    customerid?: number;
}


export interface ConsumerInstance
    extend Sequelize.Instance<ConsumerAttributes>{
    id: string;
    firstname: string;
    lastname: string;
    address: sting;
    city: string;
    zip: number;
    state: string;
    active: boolean;
    role: role;
    password: string;
    customerid: number;
}

export default(
    sequelize: Sequelize.Sequqlize,
    DataTypes: Sequelize.DataTypes,
) => {
    const Provider: any = sequelize.define(tables.consumer, {
        ...tableMeta,
        firstname:{
            allowNull: false,
            type: DataTypes.STRING,
            field: 'first_name',
        },
        lastname:{
            allowNull: false,
            type: DataTypes.STRING,
            field: 'last_name',
        },
        address: {
            allowNull: false,
            type: Datatypes.STRING,
            field: 'address',
        },
        city: {
            allowNull: false,
            type: Datatypes.STRING,
            field: 'city',
        },
        state: {
            allowNull: false,
            type: Datatypes.STRING,
            field: 'state',
        },
        zip: {
            allowNull: false,
            type: Datatypes.INTEGER,
            field: 'zip',
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        active: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        customerId: {
            allowNull: false,
            unique: true,
            type: DataTypes.INTEGER,
            field: 'customer_id',
        },
        role: {
            allowNull: false,
            type: DataTypes.ENUM(
                role.CONSUMER,
            ),
        },
    });

// i dont think we need this anymore
    Consumer.associate = (models: Models) => {
        Consumer.belongsTo(models.consumers, {
          as: 'manager',
          foreignKey: {
            allowNull: true,
            field: 'manager_id',
          },
        });
    };

    return Consumer;
};

