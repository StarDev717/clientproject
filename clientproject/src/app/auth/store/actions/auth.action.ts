import { Action } from "@ngrx/store";
import { Auth } from "../../models/auth.model";

// LOGIN
export const LOGIN = "[Auth] LOGIN";
export const LOGIN_SUCCESS = "[Auth] LOGIN_SUCCESS";
export const LOGIN_FAIL = "[Auth] LOGIN_FAIL";

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: any) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

// LOGOUT
export const LOGOUT = "[Auth] LOGOUT";
export const LOGOUT_SUCCESS = "[Auth] LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "[Auth] LOGOUT_FAIL";

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LogoutFail implements Action {
  readonly type = LOGOUT_FAIL;
  constructor(public payload: any) {}
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type AuthAction =
  | Login
  | LoginFail
  | LoginSuccess
  | Logout
  | LogoutFail
  | LogoutSuccess;
