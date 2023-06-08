import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    ThemesComponent
  ],
  imports: [
    CommonModule,
    ThemesRoutingModule,
    MatCardModule
  ]
})
export class ThemesModule { }
