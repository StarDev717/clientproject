import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgmCoreModule} from "@agm/core";
import { AgmDirectionModule } from 'agm-direction'
import {RouterModule} from "@angular/router";
import {LocationsService} from "../shared/services/locations.service";
import {MapsService} from "../shared/services/maps.service";
import { MapComponent } from './components/map/map.component';
import {PipeModule} from "../pipe/pipe.module";

@NgModule({
  exports: [
    CommonModule,
    MapComponent
  ],
  imports:[
    RouterModule,
    CommonModule,
    PipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3a71eakX1ji_aFPmQpGf5gWD278RRl4o',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  providers: [
    LocationsService,
    MapsService
  ],
  declarations: [
    MapComponent
  ]
})

export class MapModule { }

