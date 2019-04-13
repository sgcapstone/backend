// import * as Sequelize from 'sequelize';
//
// import {tableMeta, tables} from '../constants';
// import {role} from './enums/role';
//
// export interface EmployeeAttributes {
//   id?: string;
//   firstName?: string;
//   lastName?: string;
//   employeeId?: number;
//   active?: boolean;
//   role?: role;
//   managerId?: string;
//   password?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
//
// export interface EmployeeInstance
//   extends Sequelize.Instance<EmployeeAttributes> {
//   id: string;
//   firstName: string;
//   lastName: string;
//   employeeId: number;
//   active: boolean;
//   role: role;
//   manager: string | null;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
//
// export default (
//   sequelize: Sequelize.Sequelize,
//   DataTypes: Sequelize.DataTypes,
// ) => {
//   const Employee: any = sequelize.define(tables.employees, {
//     ...tableMeta,
//     firstName: {
//       allowNull: false,
//       type: DataTypes.STRING,
//       field: 'first_name',
//     },
//     lastName: {
//       allowNull: false,
//       type: DataTypes.STRING,
//       field: 'last_name',
//     },
//     employeeId: {
//       allowNull: false,
//       unique: true,
//       type: DataTypes.INTEGER,
//       field: 'employee_id',
//     },
//     active: {
//       allowNull: false,
//       type: DataTypes.BOOLEAN,
//     },
//     role: {
//       allowNull: false,
//       type: DataTypes.ENUM(
//         role.GENERAL_MANANGER,
//         role.SHIFT_MANAGER,
//         role.CASHIER,
//       ),
//     },
//     password: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//   });
//
//   Employee.associate = (models: Models) => {
//     Employee.belongsTo(models.employees, {
//       as: 'manager',
//       foreignKey: {
//         allowNull: true,
//         field: 'manager_id',
//       },
//     });
//   };
//
//   return Employee;
// };
