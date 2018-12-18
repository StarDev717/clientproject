import { Action } from "@ngrx/store";

import { User } from "../../models/user.model";

// load events
export const LOAD_USERS = "[Products] Load Users";
export const LOAD_USERS_FAIL = "[Products] Load Users Fail";
export const LOAD_USERS_SUCCESS = "[Products] Load Users Success";

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
}

export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;
  constructor(public payload: any) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

// create User
export const CREATE_USER = "[Products] Create User";
export const CREATE_USER_FAIL = "[Products] Create User Fail";
export const CREATE_USER_SUCCESS = "[Products] Create User Success";

export class CreateUser implements Action {
  readonly type = CREATE_USER;
  constructor(public payload: User) {}
}

export class CreateUserFail implements Action {
  readonly type = CREATE_USER_FAIL;
  constructor(public payload: any) {}
}

export class CreateUserSuccess implements Action {
  readonly type = CREATE_USER_SUCCESS;
  constructor(public payload: User) {}
}

// update User
export const UPDATE_USER = "[Products] Update User";
export const UPDATE_USER_FAIL = "[Products] Update User Fail";
export const UPDATE_USER_SUCCESS = "[Products] Update User Success";

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: User) {}
}

export class UpdateUserFail implements Action {
  readonly type = UPDATE_USER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
  constructor(public payload: User) {}
}

// remove User
export const REMOVE_USER = "[Products] Remove User";
export const REMOVE_USER_FAIL = "[Products] Remove User Fail";
export const REMOVE_USER_SUCCESS = "[Products] Remove User Success";

export class RemoveUser implements Action {
  readonly type = REMOVE_USER;
  constructor(public payload: User) {}
}

export class RemoveUserFail implements Action {
  readonly type = REMOVE_USER_FAIL;
  constructor(public payload: any) {}
}

export class RemoveUserSuccess implements Action {
  readonly type = REMOVE_USER_SUCCESS;
  constructor(public payload: User) {}
}

// action types
export type UsersAction =
  | LoadUsers
  | LoadUsersFail
  | LoadUsersSuccess
  | CreateUser
  | CreateUserFail
  | CreateUserSuccess
  | UpdateUser
  | UpdateUserFail
  | UpdateUserSuccess
  | RemoveUser
  | RemoveUserFail
  | RemoveUserSuccess;
