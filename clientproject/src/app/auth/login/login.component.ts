import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {select, Store} from '@ngrx/store';
import * as fromStore from "../../auth/store";
import { User } from "../../users/models/user.model";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("f") loginForm: NgForm;
  isAuthenticated$: Observable<boolean>;
  submitted = false;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  @ViewChild('inputUserName') userNameElement: ElementRef;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStore.AuthState>
  ) {}

  ngAfterViewInit() {
    this.userNameElement.nativeElement.focus();
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(fromStore.isAuthenticated));
    this.isLoading$ = this.store.pipe(select(fromStore.authenticateLoading));
    this.isLoaded$ = this.store.pipe(select(fromStore.authenticateLoaded));
  }

  // On submit button click
  onSubmit() {
    this.submitted = true;
    this.store.dispatch(new fromStore.Login(this.loginForm.value));
    this.loginForm.reset();
    this.isAuthenticated$.subscribe(data => {
      console.log("data", data);
    });
  }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(["forgotpassword"], { relativeTo: this.route.parent });
  }
  // On registration link click
  onRegister() {
    this.router.navigate(["register"], { relativeTo: this.route.parent });
  }


}
