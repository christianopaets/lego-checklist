import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetsRoutingModule } from './sets-routing.module';
import { SetsComponent } from './sets.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    SetsComponent
  ],
  imports: [
    CommonModule,
    SetsRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class SetsModule { }
