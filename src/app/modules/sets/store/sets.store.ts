import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {SetsState} from './sets.state';
import {filter, switchMap, tap} from 'rxjs';
import {RebrickableService} from 'ng-rebrickable';

@Injectable()
export class SetsStore extends ComponentStore<SetsState> {

  readonly next$ = this.select(s => s.next);

  readonly prev$ = this.select(s => s.prev);

  readonly sets$ = this.select(s => s.sets);

  readonly setTheme = this.updater<string>((state, value) => ({...state, themeId: value}))

  readonly load = this.effect(origin$ => origin$
    .pipe(switchMap(() => this.rebrickableService.sets({
          theme_id: this.get(s => s.themeId),
          page: this.get(s => s.page),
          page_size: 40,
          ordering: {
            type: 'DESC',
            fields: ['year', 'num_parts']
          }
        })
        .pipe(tapResponse(
          res => this.patchState({
            sets: res.results,
            next: !!res.next,
            prev: !!res.previous
          }),
          error => console.error(error)
        ))
    ))
  );

  readonly next = this.effect(origin$ => origin$
    .pipe(filter(() => this.get(s => s.next)))
    .pipe(tap(() => this.patchState(s=> ({ page: s.page + 1}))))
    .pipe(tap(() => this.load()))
  )

  readonly prev = this.effect(origin$ => origin$
    .pipe(filter(() => this.get(s => s.prev)))
    .pipe(tap(() => this.patchState(s=> ({ page: s.page - 1}))))
    .pipe(tap(() => this.load()))
  )

  constructor(private readonly rebrickableService: RebrickableService) {
    super({
      sets: [],
      prev: false,
      next: false,
      page: 1,
      themeId: ''
    });
  }

  reset(): void {
    this.setState({
      sets: [],
      prev: false,
      next: false,
      page: 1,
      themeId: ''
    });
  }
}
