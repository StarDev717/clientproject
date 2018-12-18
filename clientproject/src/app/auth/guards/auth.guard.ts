import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";

import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import * as fromStore from "../store";
import * as fromAuthStore from "../../auth/store";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authStore: Store<fromAuthStore.AuthState>
  ) {}

  getFromStoreOrAPI(): Observable<any> {
    // return an Observable stream from the store
    let token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      this.router.navigate(["/"]);
    }
    return this.authStore
      .select(fromAuthStore.isAuthenticated)
      .map(authenticated => {
        return authenticated;
      })
      .do(authenticated => {
        if (!authenticated) {
          if (token === null || token === undefined) {
            authenticated = false;
          }

          let base64Url = token.split(".")[1];
          if (base64Url === null || base64Url === undefined) {
            authenticated = false;
          }
          let base64 = base64Url.replace("-", "+").replace("_", "/");
          let checkToken = JSON.parse(window.atob(base64));
          authenticated = !(checkToken.id === null || checkToken === undefined);
          if (!authenticated) {
            this.router.navigate(["/auth/login"]);
          }
        }
        return of(authenticated);
      });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.getFromStoreOrAPI()
      .switchMap(res => {
        return Observable.of(true);
      })
      .catch(() => Observable.of(false));
  }
}
