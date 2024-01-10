import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {DictionaryEntry} from "../models/dictionaryEntry";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private readonly apiUrl: string = 'https://api.dictionaryapi.dev/api/v2/entries/en';
  readonly dictionaryKey: string = "dictionary";

  constructor(private readonly httpClient: HttpClient, private readonly localStorageService: LocalStorageService) {
  }

  getDefinition(word: string): Observable<DictionaryEntry[]> {
    const url = `${this.apiUrl}/${word}`;

    return this.httpClient.get<DictionaryEntry[]>(url);
  }

  getLastDefinitionFromLocalStorage(): Observable<DictionaryEntry[]> | null {
    let dictEntries: DictionaryEntry[] = this.localStorageService.loadFromStorage(this.dictionaryKey);

    if (dictEntries && dictEntries.length > 0) {
      return of(dictEntries);
    }

    return null;
  }
}
