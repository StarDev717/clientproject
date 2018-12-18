import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import { FormsModule } from '@angular/forms';
import {effects, reducers} from "../auth/store";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import * as fromComponents from "../auth/components";
import * as fromServices from "../auth/services";
import * as fromGuards from "../auth/guards";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  ],
  providers: [...fromServices.services],
  declarations: [...fromComponents.components],
  exports: [ ...fromComponents.components]
})
export class AuthModule { }
