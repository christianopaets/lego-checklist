import {RebrickableSet} from 'ng-rebrickable';

export interface SetsState {
  sets: RebrickableSet[];
  next: boolean;
  prev: boolean;
  page: number;
  themeId: string;
}
