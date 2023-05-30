import {Component, computed, signal} from '@angular/core';
import {DbService, LegoSetItem} from '../../../../db/db.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent {

  idFilterValue = signal<string>("");

  hideFilterValue = signal<boolean>(false);

  get idFilter(): string {
    return this.idFilterValue();
  }

  set idFilter(value: string) {
    this.idFilterValue.set(value);
  }

  get hideFilter(): boolean {
    return this.hideFilterValue();
  }

  set hideFilter(value: boolean) {
    this.hideFilterValue.set(value);
  }

  readonly dataSource = computed(() => {
    let filtered = this._dataSource;
    if (this.hideFilterValue()) {
      filtered = filtered.filter(item => item.Quantity !== item.Progress)
    }
    if (this.idFilterValue()) {
      filtered = filtered.filter(item => item.PartID.toString().includes(this.idFilterValue()))
    }
    return filtered;

  });

  readonly id = this.activatedRoute.snapshot.params['id'];

  private readonly _dataSource = this.dbService.getSetItems(this.id)

  readonly displayedColumns: (keyof LegoSetItem | string)[] = ['PartID', 'PartName', 'ImageURL', 'Quantity', 'Progress', 'By_Piece', 'By_Number'];

  constructor(private readonly dbService: DbService,
              private readonly activatedRoute: ActivatedRoute) {
  }

  addQuantity(partId: number, quantity: number): void {
    const part = this._dataSource.find(item => item.PartID === partId);
    if (!part) {
      alert(`Part ${partId} not found`);
      return;
    }
    if (part.Progress! + quantity < 0) {
      alert(`Progress can't be less than 0`);
      return;
    }
    part.Progress! += quantity;
    this.dbService.saveProgression(this.id, this._dataSource);
  }
}
