import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export interface AuthState {
  auth: any;
}


export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer
};

export const authState = createFeatureSelector<AuthState>(
  'auth'
);
