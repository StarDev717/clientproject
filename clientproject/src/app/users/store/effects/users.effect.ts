import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError } from "rxjs/operators";

import * as fromRoot from "../../../store";
import * as userActions from "../actions/users.action";
import * as fromServices from "../../services";

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: fromServices.UsersService
  ) {}

  @Effect()
  loadUsers$ = this.actions$.ofType(userActions.LOAD_USERS).pipe(
    switchMap(() => {
      return this.userService
        .getUsers()
        .pipe(
          map(users => new userActions.LoadUsersSuccess(users)),
          catchError(error => of(new userActions.LoadUsersFail(error)))
        );
    })
  );

  @Effect()
  createUser$ = this.actions$.ofType(userActions.CREATE_USER).pipe(
    map((action: userActions.CreateUser) => action.payload),
    switchMap(user => {
      return this.userService
        .createUser(user)
        .pipe(
          map(user => new userActions.CreateUserSuccess(user)),
          catchError(error => of(new userActions.CreateUserFail(error)))
        );
    })
  );

  @Effect()
  createUserSuccess$ = this.actions$
    .ofType(userActions.CREATE_USER_SUCCESS)
    .pipe(
      map((action: userActions.CreateUserSuccess) => action.payload),
      map(user => {
        return new fromRoot.Go({
          path: ["/events", user.id]
        });
      })
    );

  @Effect()
  updateUser$ = this.actions$.ofType(userActions.UPDATE_USER).pipe(
    map((action: userActions.UpdateUser) => action.payload),
    switchMap(user => {
      return this.userService
        .updateUser(user)
        .pipe(
          map(user => new userActions.UpdateUserSuccess(user)),
          catchError(error => of(new userActions.UpdateUserFail(error)))
        );
    })
  );

  @Effect()
  removeUser$ = this.actions$.ofType(userActions.REMOVE_USER).pipe(
    map((action: userActions.RemoveUser) => action.payload),
    switchMap(user => {
      return this.userService
        .removeUser(user)
        .pipe(
          map(() => new userActions.RemoveUserSuccess(user)),
          catchError(error => of(new userActions.RemoveUserFail(error)))
        );
    })
  );

  @Effect()
  handleUserSuccess$ = this.actions$
    .ofType(userActions.UPDATE_USER_SUCCESS, userActions.REMOVE_USER_SUCCESS)
    .pipe(
      map(user => {
        return new fromRoot.Go({
          path: ["/events"]
        });
      })
    );
}
