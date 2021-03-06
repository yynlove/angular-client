import { createAction, props } from "@ngrx/store";
import { User } from "../services/data-typs/data";

//设置动作
export const SetUser = createAction('[user] Set user',props<{user:User}>());

