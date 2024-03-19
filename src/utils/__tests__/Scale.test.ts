import Scale from '../Scale';

describe('Scale', () => {
  it('returns notes', () => {
    const scale = new Scale({
      tonic: 'C',
    });

    expect(scale.notes).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
  });

  it('returns triads', () => {
    const scale = new Scale({
      tonic: 'A',
    });

    expect(scale.triads).toEqual(['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim']);
  });

  it('returns sevenths', () => {
    const scale = new Scale({
      tonic: 'G',
    });

    expect(scale.sevenths).toEqual([
      'GMaj7',
      'Am7',
      'Bm7',
      'CMaj7',
      'D7',
      'Em7',
      'F#m7b5',
    ]);
  });

  it('returns degrees', () => {
    const scale = new Scale({
      tonic: 'D',
      mode: 'locrian',
    });

    expect(scale.degrees).toEqual([
      'I',
      'bII',
      'bIII',
      'IV',
      'bV',
      'bVI',
      'bVII',
    ]);
  });

  it('creates sequences', () => {
    const scale = new Scale({
      tonic: 'C',
    });

    const sequence = scale.sequence([0, 6, 4, 2, 5, 3]);

    const expected: ReturnType<typeof scale.sequence> = [
      {
        degree: 'I',
        tonic: 'C',
        triad: 'C',
        notes: ['C', 'E', 'G'],
        seventh: 'CMaj7',
        quality: 'Major',
        secondaryDominant: 'G7',
      },
      {
        degree: 'VI',
        tonic: 'A',
        triad: 'Am',
        notes: ['A', 'C', 'E'],
        seventh: 'Am7',
        quality: 'Minor',
        secondaryDominant: 'E7',
      },
      {
        degree: 'IV',
        tonic: 'F',
        triad: 'F',
        notes: ['F', 'A', 'C'],
        seventh: 'FMaj7',
        quality: 'Major',
        secondaryDominant: 'C7',
      },
      {
        degree: 'II',
        tonic: 'D',
        triad: 'Dm',
        notes: ['D', 'F', 'A'],
        seventh: 'Dm7',
        quality: 'Minor',
        secondaryDominant: 'A7',
      },
      {
        degree: 'V',
        tonic: 'G',
        triad: 'G',
        notes: ['G', 'B', 'D'],
        seventh: 'G7',
        quality: 'Major',
        secondaryDominant: 'D7',
      },
      {
        degree: 'III',
        tonic: 'E',
        triad: 'Em',
        notes: ['E', 'G', 'B'],
        seventh: 'Em7',
        quality: 'Minor',
        secondaryDominant: 'B7',
      },
    ];

    expect(sequence).toMatchObject(expected);
  });
});
