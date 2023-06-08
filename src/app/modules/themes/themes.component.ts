import { Component } from '@angular/core';
import {RebrickableService} from 'ng-rebrickable';
import {map} from 'rxjs';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent {

  readonly themes$ = this.rebrickableService.themes({
    page_size: 144,
    ordering: {
      type: 'DESC',
      fields: ['parent_id', 'id']
    }
  })
    .pipe(map(res => res.results));

  constructor(private readonly rebrickableService: RebrickableService) {
  }
}
