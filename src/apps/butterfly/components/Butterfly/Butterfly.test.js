/**
 * @jest-environment jsdom
 */
import { html } from "htm/preact";
import { render, screen } from "@testing-library/preact";

import { Butterfly } from "./index";

describe("<Butterfly>", () => {
  test("it renders", async () => {
    render(html`<${Butterfly} />`);
    const elem = await screen.getByTestId("butterfly");
    expect(elem).toBeTruthy();
  });
});
