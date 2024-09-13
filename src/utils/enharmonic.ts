import * as tonal from 'tonal';
import { Enharmonic } from '../providers/settingsContext';

const FLAT = '♭';
const SHARP = '♯';

export const toUnicode = (enharmonic: Enharmonic) => {
  switch (enharmonic) {
    case Enharmonic.FLAT:
      return FLAT;
    case Enharmonic.SHARP:
      return SHARP;
    default:
      return '';
  }
};

export const replaceWithUnicode = (source: string | number) => {
  const string = `${source}`;

  if (string.indexOf(Enharmonic.FLAT)) {
    return string.replace(Enharmonic.FLAT, FLAT);
  }

  if (string.indexOf(Enharmonic.SHARP)) {
    return string.replace(Enharmonic.SHARP, SHARP);
  }

  return source;
};

export const noteNames = (note: tonal.Core.Note) => {
  const name = `${note.letter}${note.acc}`;

  return [...new Set([name, tonal.Note.enharmonic(name)])];
};
