import { createSignal, For } from "solid-js";
import { Title } from "solid-start";
import Counter from "~/components/Counter";
import FretBoard from "~/components/FretBoard/FretBoard";
import { noteSharps, NoteToNumber } from "~/core/Nashville";
import "./index.scss";
import classnames from "classnames";

export default function Home() {
  const [curKey, setCurKey] = createSignal(0);
  const [isNashville, setIsNashville] = createSignal(true);

  return (
    <div style={{ display: "flex", "flex-direction": "column" }}>
      <div style={{ display: "flex", "font-weight": 700, padding: "8px" }}>
        Key:
      </div>
      <div style={{ display: "flex" }}>
        <For each={noteSharps}>
          {(note) => (
            <button
              class={classnames("button", {
                "button-selected": curKey() === NoteToNumber(note),
              })}
              style={{ padding: "20px" }}
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
          class={classnames("button", {
            "button-selected": isNashville(),
          })}
          onClick={() => setIsNashville(!isNashville())}
        >
          {isNashville() ? "Nashville" : "Standard"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          "align-items": "center",
          height: "100vh",
          flex: 1,
        }}
      >
        <FretBoard curKey={curKey} isNashville={isNashville} />
      </div>
    </div>
  );
}
