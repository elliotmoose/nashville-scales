import { Accessor, createSignal, For } from "solid-js";
import classnames from "classnames";
import {
  Chord,
  mod,
  NoteToNumber,
  NumberToNash,
  NumberToNote,
} from "~/core/Nashville";
import "./FretBoard.scss";
import { Mode } from "~/routes";

const markers = [3, 5, 7, 9, 12, 15, 17, 19, 21];
const strings = ["E", "A", "D", "G", "B", "E"].reverse();

interface FretBoardProps {
  curKey: Accessor<number>;
  isNashville: Accessor<boolean>;
  curChord: Accessor<Chord>;
  mode: Accessor<Mode>;
}
export default function FretBoard({
  curKey,
  isNashville,
  curChord,
  mode,
}: FretBoardProps) {
  const [fretCounts, setFretCounts] = createSignal(20);

  return (
    <div class="guitar-neck">
      <div class="string-tuning-container">
        <For each={strings}>
          {(string) => <button class="string-tuning">{string}</button>}
        </For>
      </div>
      <For each={Array.from(Array(fretCounts()).keys())}>
        {(i) => (
          <div class="fret-container">
            <div class="fret-space">
              {markers.includes(i + 1) && <div class="fret-dot" />}
              {i + 1 === 12 && (
                <div class="fret-dot" style={{ ["margin-top"]: "36px" }} />
              )}
            </div>
            <div class="fret-bar"></div>
          </div>
        )}
      </For>
      <div class="strings-container">
        <For each={strings}>
          {(string) => (
            <div class="string-container">
              <div class="string-render" />
              <For each={Array.from(Array(fretCounts()).keys())}>
                {(i) => {
                  const number = mod(NoteToNumber(string) + i + 1, 12);
                  const note = () =>
                    isNashville()
                      ? NumberToNash(number, curKey())
                      : NumberToNote(number);

                  let classStr = () => {
                    if (mode() == Mode.KEY) {
                      const isRoot = () => NumberToNash(number, curKey()) === 1;
                      const isOffKey = () =>
                        String(NumberToNash(number, curKey())).includes(".5");

                      return classnames("note", {
                        "note-off-key": isOffKey(),
                        "note-root": isRoot(),
                      });
                    } else if (mode() === Mode.CHORD) {
                      // in chord mode, is root if is cur
                      const isChordRoot = () =>
                        curChord()?.getRootNumber() === number;

                      const isKeyRoot = () =>
                        NumberToNash(number, curKey()) === 1;

                      console.log(curChord()?.getNoteNumbers());
                      const notInChord = () =>
                        !curChord()?.getNoteNumbers().includes(number);

                      return classnames("note", {
                        "note-off-key": notInChord(),
                        "note-root": isChordRoot(),
                        "note-key-root": isKeyRoot(),
                      });
                    }
                  };

                  return (
                    <div class="note-container">
                      <div class={classStr()}>
                        <p>{note()}</p>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
