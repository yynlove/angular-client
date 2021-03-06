
import { createFeatureSelector, createReducer, createSelector } from "@ngrx/store";
import { UserState } from "./app-reducer";


const selectUserStates = (state:UserState) => state;

export const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(selectUserStates,(state:UserState) => state.user);
