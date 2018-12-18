import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects, CustomSerializer } from "./store";
// not used in production
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

// import { ChangeLogComponent } from './changelog/changelog.component';
// import { FullLayoutPageComponent } from './pages/full-layout-page/full-layout-page.component';
// import { ContentLayoutPageComponent } from './pages/content-layout-page/content-layout-page.component';
import { NgrxFormsModule } from "ngrx-forms";
import { ConfigurationService } from "./shared/services/configuration.service";
import { DataService } from "./shared/services/data.service";
import * as fromAuth from "src/app/auth/store";
import * as fromServices from "./auth/services";
import * as fromGuards from "./auth/guards";
import {EditUserModalComponent} from "./users/edit-user-modal/edit-user-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./auth/services";
import {PipeModule} from "./pipe/pipe.module";
const environment = {
  development: true,
  production: false
};
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, EditUserModalComponent],
  exports: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.development ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    SharedModule,
    NgrxFormsModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    EditUserModalComponent
  ],
  providers: [
    ConfigurationService,
    DataService,
    ...fromGuards.guards,
  { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
