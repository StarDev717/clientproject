import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../store";
import * as fromFeature from "../reducers";
import * as fromUsers from "../reducers/users.reducer";

import { User } from "../../models/user.model";

export const getUserState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.UsersState) => state.users
);

export const getUsersEntities = createSelector(
  getUserState,
  fromUsers.getUsersEntities
);

export const getAllUsers = createSelector(getUsersEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getUsersLoaded = createSelector(
  getUserState,
  fromUsers.getUsersLoaded
);
export const getUsersLoading = createSelector(
  getUserState,
  fromUsers.getUsersLoading
);
