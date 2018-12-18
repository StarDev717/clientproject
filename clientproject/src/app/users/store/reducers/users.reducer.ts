import * as fromUsers from "../actions/users.action";
import { User } from "../../models/user.model";

export interface UserState {
  entities: { [id: number]: User };
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromUsers.UsersAction
): UserState {
  switch (action.type) {
    case fromUsers.LOAD_USERS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromUsers.LOAD_USERS_SUCCESS: {
      const users = action.payload;

      const entities = users.reduce(
        (entities: { [id: string]: User }, user: User) => {
          return {
            ...entities,
            [user.id]: user
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

    case fromUsers.LOAD_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromUsers.UPDATE_USER_SUCCESS:
    case fromUsers.CREATE_USER_SUCCESS: {
      const user = action.payload;
      const entities = {
        ...state.entities,
        [user.id]: user
      };

      return {
        ...state,
        entities
      };
    }

    case fromUsers.REMOVE_USER_SUCCESS: {
      const user = action.payload;
      const { [user.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getUsersEntities = (state: UserState) => state.entities;
export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
