// import * as bcrypt from 'bcrypt';
// import {NextFunction, Request, Response} from 'express';
//
// import {getModels} from '../models';
// import {role} from '../models/enums/role';
//
// import {saltRounds, sanatizeInData} from './misc';
//
// // Not in controllers/misc because other controllers probably won't need this
// const sanatizeEmployee = (employee: Employee) => {
//   const {password, ...rest} = employee.get({plain: true});
//   return rest;
// };
//
// export default {
//   async getAll(req: Request, res: Response, next: NextFunction) {
//     const models = getModels();
//     const employees = await models.employees.findAll({
//       attributes: {exclude: ['password']}
//     });
//     return res.status(200).json(employees);
//   },
//
//   async getById(req: Request, res: Response, next: NextFunction) {
//     const models = getModels();
//     const employeeId = req.params.id;
//     const employee = await models.employees.findOne({
//       attributes: {exclude: ['password']},
//       where: {id: employeeId}
//     });
//     return res.status(200).json(employee);
//   },
//
//   async getByEmployeeId(req: Request, res: Response, next: NextFunction) {
//     const models = getModels();
//     const employeeId = req.params.employeeId;
//     const employee = await models.employees.findOne({
//       where: {employeeId},
//     });
//     if (employee) {
//       return res.status(200).json(true);
//     }
//     return res.status(200).json(false);
//   },
//
//   async count(req: Request, res: Response, next: NextFunction) {
//     const models = getModels();
//     const count = await models.employees.count();
//     return res.status(200).json(count);
//   },
//
//   async create(req: Request, res: Response, next: NextFunction) {
//     const models = getModels();
//     if ((await models.employees.count()) > 9998) {
//       return res.boom.internal(
//         'Database cannot accept more employees until some are removed',
//       );
//     }
//
//     let employeeId = null;
//     let password = req.body.password;
//     while (!employeeId) {
//       // doesnt exist yet
//       employeeId = Math.floor(Math.random() * 10000);
//       if(req.body.firstName = "User"){
//         if(req.body.lastName = "Name"){
//           employeeId = 1;
//           password = "password";
//         }
//       }
//       const foundEmployee = await models.employees.findOne({
//         where: {employeeId},
//       });
//       if(req.body.firstName != "User"){
//         if(req.body.lastName != "Name"){
//           if (foundEmployee) {
//             employeeId = null;
//           }
//         }
//       }
//     }
//
//     const hash = await bcrypt.hash(req.body.password, saltRounds);
//     const employee = await models.employees.create({
//       ...sanatizeInData(req.body),
//       password: hash,
//       employeeId,
//       active: true,
//       role: role.CASHIER,
//     });
//
//     return res.status(201).json(sanatizeEmployee(employee));
//   },
//
//   async update(req: Request, res: Response, next: NextFunction) {
//     const models = getModels();
//     const employeeId = req.params.id;
//
//     await models.employees.update(sanatizeInData(req.body), {
//       where: {id: employeeId},
//     });
//     const updatedEmployee = await models.employees.findOne({
//       attributes: {exclude: ['password']},
//       where: {id: employeeId}
//     });
//
//     return res.status(200).json(updatedEmployee);
//   },
//
//   async delete(req: Request, res: Response, next: NextFunction) {
//     const models = getModels();
//     const employeeId = req.params.id;
//     await models.employees.destroy({
//       where: {id: employeeId}
//     });
//     return res.status(200).end();
//   },
//
//   async login(req: Request, res: Response, next: NextFunction) {
//     const models = getModels();
//
//     const employee = await models.employees.findOne({
//       where: {employeeId: req.body.employeeId},
//     });
//     if (!employee) {
//       return res.boom.badRequest('Employee not found');
//     }
//
//     const doPasswordsMatch = await bcrypt.compare(
//       req.body.password,
//       employee.password,
//     );
//     if (doPasswordsMatch) {
//       return res.status(200).json(sanatizeEmployee(employee));
//     }
//     return res.boom.unauthorized();
//   },
// };
