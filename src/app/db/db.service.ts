import {Injectable} from '@angular/core';
import list from "./list.json";
import set42082_1 from './sets/42082-1.json';

export interface LegoSet {
  id: string;
  name: string;
  image: string;
}

export interface LegoSetItem {
  PartID: number;
  Quantity: number;
  Colour: string;
  Category: string;
  DesignID: number;
  PartName: string;
  ImageURL: string;
  SetCount: number;
  Progress?: number;
}

@Injectable()
export class DbService {

  private readonly _sets: Map<string, LegoSetItem[]> = new Map([
    ["42082-1", set42082_1]
  ]);

  getSetList(): LegoSet[] {
    return list;
  }

  getSetItems(id: string): LegoSetItem[] {
    if (!this._sets.has(id)) {
      throw new Error("Set not found");
    }
    const set = this._sets.get(id)!;
    const localStorageSet = this._getFromLocalStorage(id);
    if (!localStorageSet) {
      const newSet = set.map(item => ({...item, Progress: 0}));
      this.saveProgression(id, newSet);
      return newSet;
    }
    return set.map(item => {
      const progress = localStorageSet.find(progressItem => progressItem.PartID === item.PartID);
      return {
        ...item,
        Progress: progress?.Progress || 0
      }
    });
  }

  saveProgression(id: string, set: LegoSetItem[]): void {
    localStorage.setItem(`lego_set_id:${id}`, JSON.stringify(set));
  }

  private _getFromLocalStorage(id: string): LegoSetItem[] | null {
    const set = localStorage.getItem(`lego_set_id:${id}`);
    if (!set) {
      return null
    }
    return JSON.parse(set);
  }
}
