import { createEffect, createSignal, For, Show } from "solid-js";
import { Title } from "solid-start";
import Counter from "~/components/Counter";
import FretBoard from "~/components/FretBoard/FretBoard";
import {
  Chord,
  defaultNashNumbers,
  makeChord,
  noteSharps,
  NoteToNumber,
} from "~/core/Nashville";
import "./index.scss";
import classnames from "classnames";

export enum Mode {
  /**
   * Display all notes in current key
   */
  KEY = "KEY",
  /**
   * Chord mode: display
   * notes in the current chord
   */
  CHORD = "CHORD",
}

export default function Home() {
  const [curKey, setCurKey] = createSignal(0);
  const [curChord, setCurChord] = createSignal<Chord | null>(null);
  const [isNashville, setIsNashville] = createSignal(true);
  const [mode, setMode] = createSignal(Mode.KEY);

  createEffect(() => {
    if (curChord() && curChord()?.key !== curKey()) {
      setCurChord(makeChord(curChord().nash, curKey()));
    }
  });
  return (
    <div style={{ display: "flex", "flex-direction": "column" }}>
      <div class="options-label">Choose a key:</div>
      <div class="options-container">
        <For each={noteSharps}>
          {(note) => (
            <button
              class={classnames("button", {
                "button-selected": curKey() === NoteToNumber(note),
              })}
              style={{ padding: "16px" }}
              onClick={() => {
                setCurKey(NoteToNumber(note));
              }}
            >
              {note}
            </button>
          )}
        </For>
        <div style={{ flex: 1 }} />
        <button
          class="button button-selected"
          style={{ "margin-right": "16px" }}
          onClick={() => {
            const newMode = mode() === Mode.KEY ? Mode.CHORD : Mode.KEY;
            setMode(newMode);
          }}
        >
          Mode: {mode().toString()}
        </button>
        <button
          class={classnames("button button-selected")}
          onClick={() => setIsNashville(!isNashville())}
        >
          {isNashville() ? "Numbers" : "Notes"}
        </button>
      </div>

      <Show when={mode() === Mode.CHORD}>
        <div class="options-label">Choose a chord:</div>
        <div class="options-container">
          <For each={defaultNashNumbers}>
            {(nash) => (
              <button
                class={classnames("button", {
                  "button-selected": curChord()?.nash === nash,
                })}
                style={{ padding: "20px" }}
                onClick={() => {
                  if (nash === curChord()?.nash) {
                    setCurChord(null);
                  } else {
                    setCurChord(makeChord(nash, curKey()));
                  }
                }}
              >
                {makeChord(nash, curKey()).getName}
              </button>
            )}
          </For>
        </div>
      </Show>
      <div
        style={{
          display: "flex",
          "align-items": "center",
          height: "100vh",
          flex: 1,
        }}
      >
        <FretBoard
          curKey={curKey}
          curChord={curChord}
          mode={mode}
          isNashville={isNashville}
        />
      </div>
    </div>
  );
}
