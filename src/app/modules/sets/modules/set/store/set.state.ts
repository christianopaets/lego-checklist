import {Color, Part, PartInfo} from 'ng-rebrickable';
import {Progress} from '../../../../../interfaces/progress.interface';

export interface SetState {
  parts: PartInfo<Part, Color>[];
  id: string | undefined;
  progress: Progress[];
}
