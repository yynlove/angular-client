
import { on } from "@ngrx/store";
import { createReducer } from "@ngrx/store";
import { User } from "../services/data-typs/data";
import { SetUser } from "./app-action";

export type UserState ={
  user:User;
}

//初始状态
export const initUserState : UserState={
  user:null,
}

/**
 * 注册动作
 */

const _userReducer = createReducer(
  //初始
  initUserState,
  //设置动作
  on(SetUser,(userState,{user}) =>({...userState,user}))
  );


  export function userReducer(userState :UserState, action){
    return _userReducer(userState,action);
  }
