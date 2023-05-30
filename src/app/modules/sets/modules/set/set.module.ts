import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {SetRoutingModule} from './set-routing.module';
import {SetComponent} from './set.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SetQuantityInputComponent} from './set-quantity-input/set-quantity-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    SetComponent,
    SetQuantityInputComponent
  ],
  imports: [
    CommonModule,
    SetRoutingModule,
    MatTableModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule
  ]
})
export class SetModule {
}
