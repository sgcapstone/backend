import * as Sequelize from 'sequelize';

import {tableMeta, tables} from '../constants';
import {role} from '../enums/role';

export interface ServicesAttributes{
    servicename?: string;
    providername?: number;
}


export interface ServicesInstance
    extend Sequelize.Instance<ServicesAttributes>{
    servicename: string;
    providername: number;
}

export default(
    sequelize: Sequelize.Sequqlize,
    DataTypes: Sequelize.DataTypes,
) => {
    const Provider: any = sequelize.define(tables.consumer, {
        ...tableMeta,
        servicename:{
            allowNull: false,
            type: DataTypes.STRING,
            field: 'service_name',
        },
        providername:{
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'provider_name',
        },
    });

    return Consumer;
};

