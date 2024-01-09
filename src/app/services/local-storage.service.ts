import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  saveToLocalStorage<T>(storageKey: string, items: T[]): void {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  loadFromStorage<T>(storageKey: string): T[] {
    const storedItems = localStorage.getItem(storageKey);
    return storedItems != null ? JSON.parse(storedItems) : [];
  }
}
