import { sample, shuffle } from "lodash-es";
import { MOST_FRUSTRATING_KEYS } from "./keys";

export const DUSTINESS = {
  meh: { value: 0, next: "bad" },
  bad: { value: 0.25, next: "worse" },
  worse: { value: 0.75, next: "meh" },
};

export const handlers = {
  keydown(state, event) {
    const keys = new Set(state.keys);
    keys.add(event.code);
    const letter = event.code.replace("Key", "");

    const diceRoll = Math.random();
    const dustiness = DUSTINESS[state.params.get(letter) || "meh"];
    if (dustiness.value >= diceRoll) {
      const misfire = Math.random() >= 0.5 ? "ghost" : "stuck";
      if (misfire === "stuck") {
        event.preventDefault();
        return { ...state, keys };
      }
      return { ...state, keys, ghost: event };
    }
    return { ...state, keys };
  },
  keyup(state, event) {
    // work around the macOS Command key preventing keyup on other keys
    const nextKeys = event.key === "Meta" ? new Set() : new Set(state.keys);
    nextKeys.delete(event.code);
    return { ...state, keys: nextKeys };
  },
  popstate(state, event) {
    const params = new URLSearchParams(event.target.location.search);
    return { ...state, params };
  },
  click(state, event) {
    event.preventDefault();
    const letter = event.target.value;
    const nextParams = new URLSearchParams(state.params);
    const prevDustiness = nextParams.get(letter) || "meh";
    const nextDustiness = DUSTINESS[prevDustiness].next;
    const { value } = DUSTINESS[nextDustiness];
    if (value > 0) {
      nextParams.set(letter, nextDustiness);
    } else {
      nextParams.delete(letter);
    }
    return { ...state, params: nextParams };
  },
  reset(state) {
    const stuck = shuffle(MOST_FRUSTRATING_KEYS).slice(4);
    const nextParams = new URLSearchParams();
    const dustiness = Object.keys(DUSTINESS).filter((name) => name !== "meh");

    stuck.forEach((key) => {
      nextParams.set(key, sample(dustiness));
    });

    return { ...state, params: nextParams };
  },
};
