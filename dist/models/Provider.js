"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function default_1(sequelize, DataTypes) {
    const Provider = sequelize.define(constants_1.tables.providers, Object.assign({}, constants_1.tableMeta, { providerName: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'provider_name',
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
        }, providerId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'provider_id',
        }, phone: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'phone',
        }, email: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'email',
        }, password: {
            allowNull: false,
            type: DataTypes.STRING,
        } }));
    return Provider;
}
exports.default = default_1;
//# sourceMappingURL=Provider.js.map