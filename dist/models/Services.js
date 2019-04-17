"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
function default_1(sequelize, DataTypes) {
    const Service = sequelize.define(constants_1.tables.services, Object.assign({}, constants_1.tableMeta, { serviceName: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'service_name',
        }, providerId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'provider_id',
        } }));
    return Service;
}
exports.default = default_1;
//# sourceMappingURL=Services.js.map