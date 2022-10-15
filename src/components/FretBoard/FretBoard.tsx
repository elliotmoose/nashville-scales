import { createSignal, For } from "solid-js";
import classnames from "classnames";
import { NoteToNumber, NumberToNash, NumberToNote } from "~/core/Nashville";
import "./FretBoard.scss";

const markers = [3, 5, 7, 9, 12, 15, 17, 19, 21];
const strings = ["E", "A", "D", "G", "B", "E"].reverse();

export default function FretBoard({ curKey, isNashville }) {
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
                  const number = NoteToNumber(string) + i + 1;
                  const note = () =>
                    isNashville()
                      ? NumberToNash(number, curKey())
                      : NumberToNote(number);

                  const isRoot = () => NumberToNash(number, curKey()) === 1;
                  const isOffKey = () =>
                    String(NumberToNash(number, curKey())).includes(".5");

                  return (
                    <div class="note-container">
                      <div
                        class={classnames("note", {
                          "note-off-key": isOffKey(),
                          "note-root": isRoot(),
                        })}
                      >
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
