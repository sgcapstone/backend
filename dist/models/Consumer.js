"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function default_1(sequelize, DataTypes) {
    const Consumer = sequelize.define(constants_1.tables.consumers, Object.assign({}, constants_1.tableMeta, { firstName: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'first_name',
        }, lastName: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'last_name',
        }, address: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'address',
        }, city: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'city',
        }, state: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'state',
        }, zip: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'zip',
        }, password: {
            allowNull: false,
            type: DataTypes.STRING,
        }, customerId: {
            allowNull: false,
            unique: true,
            type: DataTypes.INTEGER,
            field: 'customer_id',
        } }));
    return Consumer;
}
exports.default = default_1;
//# sourceMappingURL=Consumer.js.map