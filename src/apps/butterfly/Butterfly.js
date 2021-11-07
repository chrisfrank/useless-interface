import { html } from "htm/preact";
import { useButterfly } from "./state";
import { QWERTY } from "./keys";
import { butterflyStyles } from "./styles";

function KeyButton({ letter = "", onClick, params, keys }) {
  const code = `Key${letter}`;
  const isPressed = keys.has(code);
  const dustiness = params.get(code);
  return html`
    <button
      className="Butterfly__Button"
      onClick=${onClick}
      disabled=${isPressed}
      value=${code}
      data-dustiness=${dustiness}
    >
      ${letter}
    </button>
  `;
}

export function Butterfly() {
  const [state, dispatch, ref] = useButterfly();
  return html`
    <main className=${butterflyStyles}>
      <div className="Butterfly__Laptop">
        <textarea
          autofocus
          ref=${ref}
          type="text"
          className="Butterfly__Screen"
        />
        <div className="Butterfly__Keyboard">
          ${QWERTY.map(
            (row) => html`
              <div className="Butterfly__KeyboardRow">
                ${row.map(
                  (key) => html`
                    <${KeyButton}
                      keys=${state.keys}
                      params=${state.params}
                      onClick=${dispatch}
                      letter=${key}
                    >
                      ${key}
                    </${KeyButton}>
                  `
                )}
              </div>
            `
          )}
        </div>
      </div>
      <footer className="Butterfly__Banner">
        <a href="/">Butterfly ⟲</a>
      </footer>
    </main>
  `;
}
