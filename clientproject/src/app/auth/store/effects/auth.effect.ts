import { Injectable } from "@angular/core";

import {Effect, Actions, ofType} from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import * as AuthServices from "../../services";
import * as AuthActions from "../../store/actions";
import { Router } from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthServices.AuthService
  ) {}

  @Effect()
  authorizeUser$ = this.actions$.ofType(AuthActions.LOGIN).pipe(
    map((action: AuthActions.Login) => action.payload),
    switchMap(data => {
      return this.authService.logIn(data).pipe(
        map(res => {
          return new AuthActions.LoginSuccess(res);
        }),

        catchError(error => of(new AuthActions.LoginFail(error)))
      );
    })
  );

  @Effect()
  logout$ = this.actions$.ofType(AuthActions.LOGOUT).pipe(
    switchMap(data => {
      return Observable.of(new AuthActions.LogoutSuccess(true))
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.ofType(AuthActions.LOGIN_SUCCESS).pipe(
    tap(data => {
      this.router.navigate(["/projects/list"]);
    })
  );

  @Effect({ dispatch: false })
  logoutSuccess$ = this.actions$.ofType(AuthActions.LOGOUT_SUCCESS).pipe(
    tap(data => {
      this.router.navigate(["/"]);
    })
  );
}
