interface Obj {
  // id: string;
  createdAt: Date;
  updatedAt: Date;
  [propName: string]: any;
}
export const sanatizeInData = ({/*id, */createdAt, updatedAt, ...rest}: Obj) =>
  rest;

export const saltRounds = 10;
