function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

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
