import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects } from "./store";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// components
import * as fromComponents from "./components";

// containers
import * as fromContainers from "./containers";

// guards
import * as fromGuards from "./guards";
import * as fromAuthGuards from "../auth/guards";

// services
import * as fromServices from "./services";
import { EditBuildingModalComponent } from './edit-building-modal/edit-building-modal.component';
import {PipeModule} from '../pipe/pipe.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// routes
export const ROUTES: Routes = [
  {
    path: "",
    canActivate: [fromAuthGuards.AuthGuard],
    component: fromContainers.BuildingsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("buildings", reducers),
    EffectsModule.forFeature(effects),
    Ng2SmartTableModule,
    PipeModule,
    NgbModule
  ],
  entryComponents: [
    EditBuildingModalComponent
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components, EditBuildingModalComponent],
  exports: [...fromContainers.containers, ...fromComponents.components, EditBuildingModalComponent],
})
export class BuildingsModule {}
