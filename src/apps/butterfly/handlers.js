export const dustinessMenu = {
  "": "0.25",
  0.25: "0.75",
  0.75: "",
};

export const handlers = {
  keydown(state, event) {
    const keys = new Set(state.keys);
    keys.add(event.code);

    const diceRoll = Math.random();
    const dustiness = +(state.params.get(event.code) || 0);
    if (dustiness >= diceRoll) {
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
    const code = event.target.value;
    const nextParams = new URLSearchParams(state.params);
    const prevDustiness = nextParams.get(code) || "";
    console.log(code, nextParams);
    const nextDustiness = dustinessMenu[prevDustiness] || "";
    if (nextDustiness) {
      nextParams.set(code, nextDustiness);
    } else {
      nextParams.delete(code);
    }
    return { ...state, params: nextParams };
  },
  reset(state, event) {
    return { ...state, params: event.params };
  },
};
