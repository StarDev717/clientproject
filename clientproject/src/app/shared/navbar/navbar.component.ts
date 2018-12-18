import { Component } from '@angular/core';
import * as fromStore from "../../auth/store";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.AuthState>
  ) {}
  logOut() {
    console.log("HELLO")
    this.store.dispatch(new fromStore.Logout());
  }
}
