import { css } from "goober";

export const butterflyStyles = css`
  display: flex;
  height: 100vh;
  width: 100%;
  text-align: center;
  overflow-x: hidden;
  background: linear-gradient(#9d9fa1, #5a5a5f);
  color: white;
  .Butterfly__Laptop {
    margin: auto;
  }
  .Butterfly__Banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: black;
    a {
      font-weight: bold;
      font-size: 1.5rem;
      padding: 0.25rem;
      display: inline-block;
      color: inherit;
      text-decoration: none;
    }
  }
  .Butterfly__Screen {
    margin: 0 auto 3rem;
    display: block;
    border: 12px solid black;
    border-bottom-width: 20px;
    border-radius: 1rem;
    width: 100%;
    width: 29rem;
    height: 18.5rem;
    resize: none;
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    font-family: menlo, monospace;
    background: linear-gradient(white, #f3f3f0);
    color: #073642;
    &:focus {
      outline: none;
    }
  }

  .Butterfly__Keyboard {
    background: linear-gradient(#acacaf, #e3e3ef);
    margin: -7rem auto 0;
    text-align: center;
    border: 3px solid black;
    border-radius: 1rem;
    width: 32rem;
    padding: 1rem 1rem 7rem;
    transform: perspective(1024px) rotateX(45deg);
  }
  .Butterfly__KeyboardRow {
    display: flex;
    gap: 4px;
    margin-bottom: 4px;
    justify-content: center;
  }
  .Butterfly__Button {
    color: white;
    background-color: #171a1f;
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    border: 1px solid;
    margin: 0;
    padding: 0;
    text-align: center;
    border-radius: 4px;
  }
  .Butterfly__Button[disabled] {
    color: white;
    transform: translateY(1px);
  }
  .Butterfly__Button[data-dustiness="0.25"] {
    background: #734d4d;
  }
  .Butterfly__Button[data-dustiness="0.75"] {
    background: #8e0000;
  }
`;
