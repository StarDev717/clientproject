import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GetInitialsPipe} from "./pipes/getinitials.pipe";
import {FilterPipe} from "./pipes/filter.pipe";
import {KeysPipe} from './pipes/keys.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GetInitialsPipe,FilterPipe, KeysPipe],
  exports: [
    GetInitialsPipe,
    FilterPipe,
    KeysPipe
  ],
})
export class PipeModule { }
