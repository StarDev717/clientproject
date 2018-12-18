import * as fromBuildings from "../actions/buildings.action";
import { Building } from "../../models/building.model";

export interface BuildingState {
  entities: { [id: number]: Building };
  loaded: boolean;
  loading: boolean;
}

export const initialState: BuildingState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromBuildings.BuildingsAction
): BuildingState {
  switch (action.type) {
    case fromBuildings.LOAD_BUILDINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromBuildings.LOAD_BUILDING_PROJECTIONS: {
      return {
        ...state
      };
    }

    case fromBuildings.LOAD_BUILDING_PROJECTIONS_SUCCESS: {
      const response = action.payload.result;

      console.log('res', response)
      return {
        ...state,
      };
    }

    case fromBuildings.LOAD_BUILDINGS_SUCCESS: {
      const buildings = action.payload.result;

      const entities = buildings.reduce(
        (entities: { [id: string]: Building }, building: Building) => {
          return {
            ...entities,
            [building.id]: building
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromBuildings.LOAD_BUILDINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromBuildings.UPDATE_BUILDING_SUCCESS:
    case fromBuildings.CREATE_BUILDING_SUCCESS: {
      const building = action.payload.result;
      const entities = {
        ...state.entities,
        [building.id]: building
      };


      return {
        ...state,
        entities
      };
    }

    case fromBuildings.REMOVE_BUILDING_SUCCESS: {
      const building = action.payload;
      const { [building.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getBuildingsEntities = (state: BuildingState) => state.entities;
export const getBuildingsLoading = (state: BuildingState) => state.loading;
export const getBuildingsLoaded = (state: BuildingState) => state.loaded;


