import { Chord, Interval, Key, Mode, RomanNumeral, transpose } from 'tonal';

interface ScaleOptions {
  tonic: string;
  mode?: string;
}

class Scale {
  tonic: string;
  mode: string;
  private _mode: ReturnType<(typeof Mode)['get']>;

  constructor(options: ScaleOptions) {
    this.tonic = options.tonic;
    this.mode = options.mode || 'ionian';

    this._mode = Mode.get(this.mode);
  }

  get degrees() {
    return this._mode.intervals.map((i) => {
      const interval = Interval.get(i);
      return RomanNumeral.get(interval).name;
    });
  }

  get notes() {
    return Mode.notes(this.mode, this.tonic);
  }

  get triads() {
    return Mode.triads(this.mode, this.tonic);
  }

  get sevenths() {
    return Mode.seventhChords(this.mode, this.tonic);
  }

  public secondaryDominant(degree: number) {
    const alternateKey = Key.majorKey(this.tonic);

    return alternateKey.secondaryDominants[degree + 1];
  }

  public sequenceNumerals(numerals: string[]) {}

  public sequence(degrees: number[]) {
    return degrees.map((i) => {
      const idx = i - 1;
      const triad = this.triads[idx];
      const seventh = this.sevenths[idx];
      const degree = this.degrees[idx];

      const { notes, tonic, quality } = Chord.get(triad);

      let secondaryDominant = '';

      if (tonic && ![1, 7].includes(i)) {
        const secondaryDominantRoot = transpose(tonic, '5P');
        secondaryDominant = `${secondaryDominantRoot}7`;
      }

      return {
        degree,
        tonic,
        triad,
        notes,
        seventh,
        quality,
        secondaryDominant,
      };
    });
  }

  private transposeWithNumeral(numeral: string) {
    const r = RomanNumeral.get(numeral);
    if (r.empty) return '';

    return transpose(this.tonic, r.interval) + r.chordType;
  }
}

export default Scale;
