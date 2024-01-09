import {MeaningDefinition} from "./meaningDefinition";

export interface Meaning {
  partOfSpeech: string;
  definitions: MeaningDefinition[];
}
