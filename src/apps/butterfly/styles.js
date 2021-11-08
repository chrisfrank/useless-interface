import { css } from "goober";

export const butterflyStyles = css`
  display: flex;
  height: 100vh;
  width: 100%;
  text-align: center;
  overflow-x: hidden;
  background: linear-gradient(#9d9fa1, #5a5a5f);
  color: white;
  display: grid;
  grid-template-rows: 1fr 2rem;
  align-items: center;
  .Butterfly__Laptop {
    padding: 1rem;
  }
  .Butterfly__Banner {
    background: rgba(0, 0, 0, 0.75);
    text-align: left;
    padding: 0 0.5rem;
    line-height: 2;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    a {
      color: inherit;
      text-decoration: none;
    }
    .Butterfly__Shuffle {
      margin-left: auto;
      height: 1.5rem;
    }
  }
  .Butterfly__Screen {
    margin: 0 auto 3rem;
    display: block;
    border: 12px solid black;
    border-bottom-width: 20px;
    border-radius: 1rem;
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
    width: 16rem;
    height: 11rem;
    @media (min-width: 640px) {
      width: 29rem;
      height: 18.5rem;
    }
  }

  .Butterfly__Keyboard {
    background: linear-gradient(#acacaf, #e3e3ef);
    text-align: center;
    border: 3px solid black;
    border-radius: 1rem;
    transform: perspective(1024px) rotateX(45deg);
    width: 17rem;
    padding: 1rem 1rem 6rem;
    margin: -6rem auto 0;
    @media (min-width: 640px) {
      margin: -7rem auto 0;
      padding: 1rem 1rem 7rem;
      width: 32rem;
      height: auto;
    }
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
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border: 1px solid;
    margin: 0;
    padding: 0;
    text-align: center;
    border-radius: 4px;
    @media (min-width: 640px) {
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
    }
  }
  .Butterfly__Button[disabled] {
    color: white;
    transform: translateY(1px);
  }
  .Butterfly__Button[data-dustiness="bad"] {
    background: #734d4d;
  }
  .Butterfly__Button[data-dustiness="worse"] {
    background: #8e0000;
  }
`;
