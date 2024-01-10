import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {DictionaryEntry} from "./models/dictionaryEntry";
import {DictionaryService} from "./services/dictionary.service";
import {LocalStorageService} from "./services/local-storage.service";
import {LoadingComponent} from "./components/loading/loading.component";
import {AccordionItemComponent} from "./components/accordion-item/accordion-item.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoadingComponent, AccordionItemComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dvar-dict';

  word: string = "";
  dictEntries: DictionaryEntry[] = [];
  synonyms: string[] = [];
  antonyms: string[] = [];

  constructor(private readonly dictionaryService: DictionaryService, private readonly locStorageService: LocalStorageService) {
    if (this.dictionaryService.getLastDefinitionFromLocalStorage() != null) {
      this.getLastDefinitionFromLocStorage()
    } else {
      this.getDefinition('kind');
    }
  }

  getDefinition(word: string): void {
    this.dictEntries.splice(0, this.dictEntries.length);
    this.dictionaryService.getDefinition(word).subscribe({
      next: (data) => {
        this.dictEntries = data;
        this.locStorageService.saveToLocalStorage(this.dictionaryService.dictionaryKey, this.dictEntries);
        this.setSynonymsAndAntonyms();
      },
      error: (error) => {
        console.error('Error fetching definition:', error);
      },
    });
  }

  getDefinitionOnKey($event: KeyboardEvent) {
    if ($event.key != 'Enter')
      return;

    this.getDefinition(this.word);
  }

  private getLastDefinitionFromLocStorage(): void {
    this.dictionaryService.getLastDefinitionFromLocalStorage()?.subscribe({
      next: (data) => {
        if (data) {
          this.dictEntries = data;
          this.setSynonymsAndAntonyms();
        }
      },
      error: (error) => {
        console.error('Error fetching definition:', error);
      },
    });
  }

  private setSynonymsAndAntonyms() {
    this.synonyms = this.dictEntries.flatMap(de =>
      de.meanings.flatMap(m =>
        m.definitions.flatMap(d => d.synonyms)
      )
    );

    this.antonyms = this.dictEntries.flatMap(de =>
      de.meanings.flatMap(m =>
        m.definitions.flatMap(d => d.antonyms)
      )
    );
  }
}
