import { createSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromAuth from "../reducers/auth.reducer";

export const getAuthState = createSelector(
  fromFeature.authState,
  (state: fromFeature.AuthState) => state.auth
);

export const isAuthenticated = createSelector(
  getAuthState,
  fromAuth.isAuthenticated
);

export const getAuthToken = createSelector(
  getAuthState,
  fromAuth.authToken
);

export const authenticateLoading = createSelector(
  getAuthState,
  fromAuth.authenticateLoading
);

export const authenticateLoaded = createSelector(
  getAuthState,
  fromAuth.authenticateLoaded
);

