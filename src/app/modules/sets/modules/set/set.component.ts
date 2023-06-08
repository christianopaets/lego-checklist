import {Component, OnInit} from '@angular/core';
import {DbService} from '../../../../db/db.service';
import {ActivatedRoute} from '@angular/router';
import {SetStore} from './store/set.store';
import {FormControl} from '@angular/forms';
import {combineLatest, debounceTime, map, startWith} from 'rxjs';
import {PartProgression} from '../../../../interfaces/part-progression.interface';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {

  readonly idFilterControl = new FormControl<string>('');

  readonly hideCompletedControl = new FormControl<boolean>(false);

  readonly id = this.activatedRoute.snapshot.params['id'];

  readonly displayedColumns = ['PartID', 'PartName', 'ImageURL', 'Quantity', 'Progress', 'By_Piece', 'By_Number'];

  readonly dataSource$ = combineLatest([
    this.setStore.parts$,
    this.idFilterControl.valueChanges.pipe(startWith(this.idFilterControl.value)).pipe(debounceTime(200)),
    this.hideCompletedControl.valueChanges.pipe(startWith(this.hideCompletedControl.value))
  ])
    .pipe(map(([parts, id, hide]) => this._filter(parts, id!, hide!)));

  readonly total$ = this.setStore.totalCount$;

  constructor(private readonly dbService: DbService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly setStore: SetStore) {
  }

  ngOnInit(): void {
    this.setStore.load(this.id);
  }

  addQuantity(id: string, progress: number): void {
    this.setStore.add({id, progress});
  }

  trackBy(index: number, value: PartProgression): number {
    return value.progress;
  }

  complete(val: PartProgression): void {
    this.addQuantity(val.element_id, val.quantity - val.progress);
  }

  private _filter(parts: PartProgression[], id: string, hide: boolean): PartProgression[] {
    if (!id && !hide) {
      return parts;
    }
    return parts.filter(part => {
      let idFilter = id ? part.element_id.includes(id) : true;
      let hideFilter = hide ? part.quantity !== part.progress : true;
      return idFilter && hideFilter;
    });
  }
}
