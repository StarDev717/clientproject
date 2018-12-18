import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromBuildings from './buildings.reducer';

export interface BuildingsState {
  buildings: any;
}

export const reducers: ActionReducerMap<BuildingsState> = {
  buildings: fromBuildings.reducer
};

export const getBuildingsState = createFeatureSelector<BuildingsState>(
  'buildings'
);
