
/**
 * 用户表
 */
export type User ={
  id?:number;
  userName?:string;
  age?:number;
  address?:string;
  password?:string;
  md5?:string;
  createTime?:Date;
  gender?:number;
  account?:string;
  remember?:number;
  token?:string;
}


/**
 * 菜单
 */
export type Menu ={
  id?:number;
  title?:string;
  link?:string;
  pid?:number;
  orderNo?:number;
  lastTime?:Date;
  isValid?:number;

  children?:Menu[];
}


export type Result ={
  httpStatus ?:string;
  message?:string;
  total?: number;
  data?:any;
}


export enum ModelType {"Login","Register"}
