import { render } from "preact";
import { html } from "htm/preact";
import { Butterfly } from "./components/Butterfly";

const App = () => html` <${Butterfly} /> `;

render(html`<${App} />`, document.getElementById("root"));
