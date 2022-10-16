export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export const defaultNashNumbers = [1, 2, 3, 4, 5, 6, 7];

export const noteSharps = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const noteFlats = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export function NoteToNumber(note: string): number {
  return noteSharps.indexOf(note) !== -1
    ? noteSharps.indexOf(note)
    : noteFlats.indexOf(note);
}

export function NumberToNote(number: number): string {
  return noteSharps[mod(number, 12)];
}

export function NumberToNash(number: number, key: number): number {
  const nash = [1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7];
  const numberInKey = mod(number - key, 12);
  return nash[numberInKey];
}

export function NashToNumber(nash: number, key: number): number {
  const nashNumbers = [1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7];
  const number = nashNumbers.indexOf(nash);
  return mod(number + key, 12);
}

export type Chord = {
  nash: number;
  key: number; // 0-11
  getName: () => string;
  getRootNumber: () => number;
  getNoteNumbers: () => number[];
};

export function makeChord(nash: number, key: number): Chord {
  const chord = {
    nash,
    key,
    getName() {
      const isMinor = [2, 3, 6].includes(chord.nash);
      const isDim = chord.nash === 7;
      return (
        NumberToNote(NashToNumber(nash, key)) +
        (isMinor ? "m" : "") +
        (isDim ? "dim" : "")
      );
    },
    getRootNumber() {
      return NashToNumber(chord.nash, chord.key);
    },
    getNoteNumbers() {
      // TODO: currently only does basic thirds, and for whole numbers only
      const third = mod(nash + 2, 7);
      const fifth = mod(third + 2, 7);
      return [
        chord.getRootNumber(),
        NashToNumber(third, chord.key),
        NashToNumber(fifth, chord.key),
      ];
    },
  };

  return chord;
}
