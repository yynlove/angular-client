
/**
 * 用户表
 */
export class User{
  id?:number;
  userName?:string;
  age?:number;
  address?:string;
  passWord?:string;
  md5?:string;
  createTime?:Date;
  gender?:number;
  account?:string;
  remember?:number;
  token?:string;
}


export type Result ={
  httpStatus ?:string;
  message?:string;
  total?: number;
  data?:any;
}