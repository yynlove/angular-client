
/**
 * 用户表
 */
export type User = {
  id?:number;
  userName?:string;
  age?:number;
  address?:string;
  passWord?:string;
  md5?:string;
  createTime?:number;
  gender?:number;
}


export type Result ={
  httpStatus ?:string;
  message?:string;
  total?: number;
  data?:any;
}
