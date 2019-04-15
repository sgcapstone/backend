import * as Sequelize from 'sequelize';
import {tableMeta, tables} from '../constants';

export interface ServicesAttributes {
    id?: string;
    serviceName?: string;
    providerId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ServicesInstance
    extends Sequelize.Instance<ServicesAttributes> {
    id: string;
    serviceName: string;
    providerId: number;
    createdAt: Date;
    updatedAt: Date;
}

export default function(
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
) {
    const Service: any = sequelize.define(tables.services, {
        ...tableMeta,
        serviceName: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'service_name',
        },
        providerId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'provider_id',
        },
    });

    return Service;
}
