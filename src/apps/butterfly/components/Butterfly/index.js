import { html } from "htm/preact";

import { useButterfly } from "./state.js";
import { QWERTY } from "./keys.js";
import { butterflyStyles } from "./styles.js";

function KeyButton({ letter = "", onClick, params, keys }) {
  const isPressed = keys.has(`Key${letter}`);
  const dustiness = params.get(letter);
  return html`
    <button
      className="Butterfly__Button"
      onClick=${onClick}
      disabled=${isPressed}
      value=${letter}
      data-dustiness=${dustiness}
    >
      ${letter}
    </button>
  `;
}

export function Butterfly() {
  const [state, dispatch, ref] = useButterfly();
  const handleShuffle = (event) => {
    event.preventDefault();
    dispatch({ type: "reset" });
  };
  return html`
    <main data-testid="butterfly" className=${butterflyStyles}>
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
      <nav className="Butterfly__Banner">
        <a href="/">Useless Interface</a>
        <span> › </span>
        <span>Butterfly</span>
        <button className="Butterfly__Shuffle" onClick=${handleShuffle}>
          Shuffle
        </button>
      </nav>
    </main>
  `;
}
