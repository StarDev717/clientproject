import { Action } from "@ngrx/store";

import { Building } from "../../models/building.model";
import {Result} from '../../../shared/models/result.model';

// load events
export const LOAD_BUILDINGS = "[Building] Load Buildings";
export const LOAD_BUILDINGS_FAIL = "[Building] Load Buildings Fail";
export const LOAD_BUILDINGS_SUCCESS = "[Building] Load Buildings Success";

export class LoadBuildings implements Action {
  readonly type = LOAD_BUILDINGS;
}

export class LoadBuildingsFail implements Action {
  readonly type = LOAD_BUILDINGS_FAIL;
  constructor(public payload: any) {}
}

export class LoadBuildingsSuccess implements Action {
  readonly type = LOAD_BUILDINGS_SUCCESS;
  constructor(public payload: Result<Building>) {}
}


// load events
export const LOAD_BUILDING_PROJECTIONS = "[Building] Load LOAD_BUILDING_PROJECTIONS";
export const LOAD_BUILDING_PROJECTIONS_FAIL = "[Building] LOAD_BUILDING_PROJECTIONS_FAIL";
export const LOAD_BUILDING_PROJECTIONS_SUCCESS = "[Building] LOAD_BUILDING_PROJECTIONS_SUCCESS";

export class LoadBuildingProjections implements Action {
  readonly type = LOAD_BUILDING_PROJECTIONS;
  constructor(public payload: any) {}
}

export class LoadBuildingProjectionsFail implements Action {
  readonly type = LOAD_BUILDING_PROJECTIONS_FAIL;
  constructor(public payload: any) {}
}

export class LoadBuildingProjectionsSuccess implements Action {
  readonly type = LOAD_BUILDING_PROJECTIONS_SUCCESS;
  constructor(public payload: Result<any>) {}
}


// create Building
export const CREATE_BUILDING = "[Building] Create Building";
export const CREATE_BUILDING_FAIL = "[Building] Create Building Fail";
export const CREATE_BUILDING_SUCCESS = "[Building] Create Building Success";

export class CreateBuilding implements Action {
  readonly type = CREATE_BUILDING;
  constructor(public payload: Building) {}
}

export class CreateBuildingFail implements Action {
  readonly type = CREATE_BUILDING_FAIL;
  constructor(public payload: any) {}
}

export class CreateBuildingSuccess implements Action {
  readonly type = CREATE_BUILDING_SUCCESS;
  constructor(public payload: Result<Building>) {}
}

// update Building
export const UPDATE_BUILDING = "[Building] Update Building";
export const UPDATE_BUILDING_FAIL = "[Building] Update Building Fail";
export const UPDATE_BUILDING_SUCCESS = "[Building] Update Building Success";

export class UpdateBuilding implements Action {
  readonly type = UPDATE_BUILDING;
  constructor(public payload: Building) {}
}

export class UpdateBuildingFail implements Action {
  readonly type = UPDATE_BUILDING_FAIL;
  constructor(public payload: any) {}
}

export class UpdateBuildingSuccess implements Action {
  readonly type = UPDATE_BUILDING_SUCCESS;
  constructor(public payload: Result<Building>) {}
}

// remove Building
export const REMOVE_BUILDING = "[Building] Remove Building";
export const REMOVE_BUILDING_FAIL = "[Building] Remove Building Fail";
export const REMOVE_BUILDING_SUCCESS = "[Building] Remove Building Success";

export class RemoveBuilding implements Action {
  readonly type = REMOVE_BUILDING;
  constructor(public payload: Building) {}
}

export class RemoveBuildingFail implements Action {
  readonly type = REMOVE_BUILDING_FAIL;
  constructor(public payload: any) {}
}

export class RemoveBuildingSuccess implements Action {
  readonly type = REMOVE_BUILDING_SUCCESS;
  constructor(public payload: Building) {}
}

// action types
export type BuildingsAction =
  | LoadBuildings
  | LoadBuildingsFail
  | LoadBuildingsSuccess
  | CreateBuilding
  | CreateBuildingFail
  | CreateBuildingSuccess
  | UpdateBuilding
  | UpdateBuildingFail
  | UpdateBuildingSuccess
  | RemoveBuilding
  | RemoveBuildingFail
  | RemoveBuildingSuccess
  | LoadBuildingProjections
  | LoadBuildingProjectionsFail
  | LoadBuildingProjectionsSuccess
  ;
