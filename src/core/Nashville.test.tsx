import { NoteToNumber, NumberToNash } from "./Nashville";

describe("nashville tests", () => {
  it("should give correct nash", () => {
    let key = NoteToNumber("C");
    expect(NumberToNash(NoteToNumber("C"), key)).toBe(1);
    expect(NumberToNash(NoteToNumber("D"), key)).toBe(2);
    expect(NumberToNash(NoteToNumber("A#"), key)).toBe(6.5);
    key = NoteToNumber("G");
    expect(NumberToNash(NoteToNumber("D"), key)).toBe(5);
    expect(NumberToNash(NoteToNumber("C"), key)).toBe(4);
    expect(NumberToNash(NoteToNumber("A"), key)).toBe(2);
    expect(NumberToNash(NoteToNumber("G"), key)).toBe(1);
  });

  it("should handle large number notes", () => {
    expect(NumberToNash(NoteToNumber("C") + 12, NoteToNumber("C"))).toBe(1);
  });
});
