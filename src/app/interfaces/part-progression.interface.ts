import {Color, Part, PartInfo} from 'ng-rebrickable';

export type PartProgression = PartInfo<Part, Color> & { progress: number }
