import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'src/app/store/index';
import {Observable} from 'rxjs/Observable';
import {Auth} from 'src/app/auth/models/auth.model';
import {DataService} from "../../shared/services/data.service";

@Injectable()
export class AuthService {

  private _user;

  constructor(private store: Store<State>, private dataService: DataService, private router: Router) {
    this.setEndpoint();
  }

  setEndpoint() {
    this.dataService.setEndpoint('auth');
  }

  logIn(data: any): Observable<Auth> {
    this.setEndpoint();
    return this.dataService.logIn<Auth>(data);
  }

  // signOut(): void {
  //   this.store.dispatch(new UserLogoutAction({}));
  // }
}
