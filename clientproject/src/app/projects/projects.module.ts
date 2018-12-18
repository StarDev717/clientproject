import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects } from "./store";
import * as fromBuilding from "../buildings/store";

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
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import {PipeModule} from '../pipe/pipe.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as fromUsers from '../users/store';
import {BuildingsService} from '../buildings/services';
import { UploadComponent } from './components/upload/upload.component';
import {MapModule} from '../map/map.module';
import { CreateProjectComponent } from './components/create-project/create-project.component';

// routes
export const ROUTES: Routes = [
  {
    path: "list",
    canActivate: [fromAuthGuards.AuthGuard],
    component: fromContainers.ProjectsComponent
  },
  {
    path: ':id/details',
    canActivate: [fromAuthGuards.AuthGuard],
    component: fromComponents.ProjectDetailsComponent
  },
  {
    path: ':id/upload',
    canActivate: [fromAuthGuards.AuthGuard],
    component: fromComponents.UploadComponent
  },
  {
    path: 'new',
    canActivate: [fromAuthGuards.AuthGuard],
    component: fromComponents.CreateProjectComponent
  },
  { path: '**',
    redirectTo: 'list',
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("projects", reducers),
    StoreModule.forFeature("buildings", fromBuilding.reducers),

    EffectsModule.forFeature(effects),
    EffectsModule.forFeature(fromBuilding.effects),

    PipeModule,
    MapModule,
    NgbModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
  ],
  providers: [...fromServices.services, ...fromGuards.guards, BuildingsService],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProjectsModule {}
