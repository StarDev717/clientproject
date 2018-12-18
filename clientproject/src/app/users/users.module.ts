import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects } from "./store";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

// components
import * as fromComponents from "./components";

// containers
import * as fromContainers from "./containers";

// guards
import * as fromGuards from "./guards";
import * as fromAuthGuards from "../auth/guards";

// services
import * as fromServices from "./services";
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import {PipeModule} from "../pipe/pipe.module";
import {MapComponent} from "../map/components/map/map.component";
import {MapModule} from "../map/map.module";

// routes
export const ROUTES: Routes = [
  {
    path: "",
    canActivate: [fromAuthGuards.AuthGuard],
    component: fromContainers.UsersComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("users", reducers),
    EffectsModule.forFeature(effects),
    Ng2SmartTableModule,
    NgbModule,
    PipeModule,
    MapModule
  ],
  entryComponents: [
    MapComponent
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class UsersModule {}
