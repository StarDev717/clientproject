import * as fromAuth from "../actions/auth.action";

export interface AuthState {
  authenticated: boolean;
  loaded: boolean;
  loading: boolean;
  authToken: string;
}

export const authInitialState: AuthState = {
  authenticated: false,
  loaded: false,
  loading: false,
  authToken: '',
};

export function reducer(
  state = authInitialState,
  action: fromAuth.AuthAction
): AuthState {
  switch (action.type) {
    case fromAuth.LOGIN: {
      return {
        ...state,
        loading: true
      };
    }

    case fromAuth.LOGIN_SUCCESS: {
      const authData = action.payload;
      localStorage.setItem("token", authData.auth_token);
      return {
        ...state,
        loading: false,
        loaded: true,
        authenticated: !!authData.auth_token,
        authToken: authData.auth_token,
      };
    }

    case fromAuth.LOGIN_FAIL: {
      const authData = action.payload;
      console.log('authData', authData.error)
      return {
        ...state,
        loading: false,
        loaded: true,
        authenticated: !authData.error,
        authToken: '',
      };
    }

    case fromAuth.LOGOUT: {
      console.log("CCC")
      return {
        ...state,
        loading: true
      };
    }

    case fromAuth.LOGOUT_SUCCESS: {
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        loaded: true,
        authenticated: false,
        authToken: null,
      };
    }

    case fromAuth.LOGOUT_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
  }

  return state;
}

export const isAuthenticated = (state: AuthState) => state.authenticated;
export const authenticateLoading = (state: AuthState) => state.loading;
export const authenticateLoaded = (state: AuthState) => state.loaded;
export const authToken = (state: AuthState) => state.authToken;
