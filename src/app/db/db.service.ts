import {Injectable} from '@angular/core';
import {Color, Part, PartInfo} from 'ng-rebrickable';
import {Progress} from '../interfaces/progress.interface';
import {LegoSetItem} from '../interfaces/lego-set-item.interface';

@Injectable()
export class DbService {

  private readonly _version = 'v1';

  saveProgression(id: string, set: Progress[]): void {
    localStorage.setItem(`lego_set_id:${id}:${this._version}`, JSON.stringify(set));
  }

  getProgress(id: string, parts: PartInfo<Part, Color>[]): Progress[] {
    const key = `lego_set_id:${id}:${this._version}`;
    if (!localStorage.getItem(key)) {
      const newProgress = parts.map(part => ({id: part.element_id, progress: 0}));
      this.saveProgression(id, newProgress);
    }
    return this._getFromLocalStorage(id);
  }

  migrate(): void {
    const progressionKeys = Object.keys(localStorage).filter(key => key.startsWith('lego_set_id:'));
    const progressionKeysOlderVersion = progressionKeys.filter(key => /^lego_set_id:(\d(-\d)?)+$/g.test(key));
    progressionKeysOlderVersion.forEach(key => this._migrateVersion0ToCurrent(key));
  }

  private _getFromLocalStorage(id: string): Progress[] {
    const set = localStorage.getItem(`lego_set_id:${id}:${this._version}`);
    return JSON.parse(set!);
  }

  private _migrateVersion0ToCurrent(key: string): void {
    const newKey = `${key}:v1`;
    const oldData = JSON.parse(localStorage.getItem(key)!) as LegoSetItem[];
    const newData = oldData.map(item => ({id: `${item.PartID}`, progress: item.Progress}));
    localStorage.setItem(newKey, JSON.stringify(newData));
    localStorage.removeItem(key);
  }
}
