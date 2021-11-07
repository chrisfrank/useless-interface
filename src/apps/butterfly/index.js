import { render } from "preact";
import { html } from "htm/preact";
import { Butterfly } from "./Butterfly";

const App = () => html` <${Butterfly} /> `;

render(html`<${App} />`, document.getElementById("root"));
