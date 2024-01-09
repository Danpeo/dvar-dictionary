import {Phonetic} from "./phonetic";
import {Meaning} from "./meaning";

export interface DictionaryEntry {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}
