import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../store";
import * as fromFeature from "../reducers";
import * as fromBuildings from "../reducers/buildings.reducer";

import { Building } from "../../models/building.model";

export const getBuildingState = createSelector(
  fromFeature.getBuildingsState,
  (state: fromFeature.BuildingsState) => state.buildings
);

export const getBuildingsEntities = createSelector(
  getBuildingState,
  fromBuildings.getBuildingsEntities
);

export const getAllBuildings = createSelector(getBuildingsEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getBuildingsLoaded = createSelector(
  getBuildingState,
  fromBuildings.getBuildingsLoaded
);
export const getBuildingsLoading = createSelector(
  getBuildingState,
  fromBuildings.getBuildingsLoading
);
