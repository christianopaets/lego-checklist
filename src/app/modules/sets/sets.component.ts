import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../../db/db.service';
import {SetsStore} from './store/sets.store';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit, OnDestroy {

  readonly sets$ = this.setsStore.sets$;

  readonly next$ = this.setsStore.next$.pipe(map(val => !val));

  readonly prev$ = this.setsStore.prev$.pipe(map(val => !val));

  constructor(private readonly dbService: DbService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly setsStore: SetsStore) {
  }

  ngOnInit(): void {
    this.setsStore.setTheme(this.activatedRoute.snapshot.params['id'])
    this.setsStore.load();
  }

  ngOnDestroy(): void {
    this.setsStore.reset();
  }

  next(): void {
    this.setsStore.next();
    this._scroll();
  }

  prev(): void {
    this.setsStore.prev();
    this._scroll();
  }

  private _scroll(): void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
}
