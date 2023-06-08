import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {SetState} from './set.state';
import {Observable, switchMap, tap} from 'rxjs';
import {RebrickableService} from 'ng-rebrickable';
import {DbService} from '../../../../../db/db.service';
import {PartProgression} from '../../../../../interfaces/part-progression.interface';
import {Progress} from '../../../../../interfaces/progress.interface';

@Injectable()
export class SetStore extends ComponentStore<SetState> {

  readonly parts$: Observable<PartProgression[]> = this.select(s => {
    return s.parts.filter(item => !item.is_spare)
      .map(part => ({...part, progress: s.progress.find(item => item.id === part.element_id)?.progress!}));
  });

  readonly totalCount$ = this.select(this.parts$, parts => parts.reduce((prev, current) => {
    return {
      progress: prev.progress + current.progress,
      quantity: prev.quantity + current.quantity
    };
  }, {progress: 0, quantity: 0}));

  readonly load = this.effect<string>(id$ => id$
    .pipe(tap(id => this.patchState({id})))
    .pipe(switchMap(id => this.rebrickableService.setParts(id, {page_size: 300, inc_color_details: false})
      .pipe(tapResponse(
        res => this.patchState({parts: res.results, progress: this.dbService.getProgress(id, res.results)}),
        error => console.error(error)
      ))
    ))
  );

  readonly add = this.updater<Progress>((s, value) => {
    const newProgress = s.progress.map(item => item.id === value.id ?
      this._addProgress(item, value.progress)
      : item
    );
    this.dbService.saveProgression(s.id!, newProgress);
    return {
      ...s,
      progress: newProgress
    };
  });

  constructor(private readonly rebrickableService: RebrickableService,
              private readonly dbService: DbService) {
    super({
      parts: [],
      id: undefined,
      progress: []
    });
  }

  private _addProgress(progress: { id: string, progress: number }, quantity: number): { id: string, progress: number } {
    if (progress.progress + quantity < 0) {
      alert(`Progress can't be less than 0`);
      return progress;
    }
    return {
      ...progress,
      progress: progress.progress + quantity
    };
  }
}
