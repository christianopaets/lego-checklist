import { Component } from '@angular/core';
import {DbService} from '../../db/db.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent {

  readonly sets = this.dbService.getSetList();

  constructor(private readonly dbService: DbService) {
  }
}
