import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export interface UsersState {
  users: any;
}

export const reducers: ActionReducerMap<UsersState> = {
  users: fromUsers.reducer
};

export const getProductsState = createFeatureSelector<UsersState>(
  'users'
);
