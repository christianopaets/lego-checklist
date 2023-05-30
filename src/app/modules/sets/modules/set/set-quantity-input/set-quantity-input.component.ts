import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-set-quantity-input',
  templateUrl: './set-quantity-input.component.html',
  styleUrls: ['./set-quantity-input.component.scss']
})
export class SetQuantityInputComponent {

  value: number = 0;

  @Output()
  add = new EventEmitter<number>();

  proceed(): void {
    if (!this.value) {
      return;
    }
    this.add.emit(+this.value);
    this.value = 0;
  }
}
