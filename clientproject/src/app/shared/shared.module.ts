import { NgModule } from '@angular/core';
 import { CommonModule } from "@angular/common";
 import { RouterModule } from "@angular/router";

 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { HttpClientModule } from '@angular/common/http';
import * as fromAuth from "../auth/store";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {DataService} from "./services/data.service";
import {RouterStateSerializer} from "@ngrx/router-store";
import {CustomSerializer} from "../store";
import * as fromGuards from "../auth/guards";
import {ConfigurationService} from "./services/configuration.service";
import {AuthService} from "../auth/services";

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ToggleFullscreenDirective,
        NgbModule,
        HttpClientModule
    ],
    imports:[
        RouterModule,
        CommonModule,
        NgbModule,
        StoreModule.forFeature("auth", fromAuth.reducers),
        EffectsModule.forFeature(fromAuth.effects)
    ],
    providers: [
      AuthService,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ToggleFullscreenDirective
        ]
})
export class SharedModule { }
