import { useEffect, useReducer, useRef } from "preact/hooks";
import { ALPHANUMERICS } from "./keys";
import { handlers } from "./handlers";

export function usePopstateListener(window, dispatch) {
  useEffect(() => {
    window.addEventListener("popstate", dispatch);

    return function cleanup() {
      window.removeEventListener("popstate", dispatch);
    };
  }, [window, dispatch]);
}

export function useParamSync(params) {
  useEffect(() => {
    const windowParams = new URLSearchParams(location.search);
    if (params.toString() === windowParams.toString()) return;

    history.replaceState(null, "", `${location.pathname}?${params}`);
  }, [params]);
}

export function useInitialParams(params, dispatch) {
  useEffect(() => {
    if (params.toString() !== "") return;

    dispatch({ type: "reset" });
  }, [params, dispatch]);
}

export function useKeyboardListeners(ref, dispatch) {
  useEffect(() => {
    if (!ref.current) return;
    const elem = ref.current;

    elem.addEventListener("keydown", dispatch);
    elem.addEventListener("keyup", dispatch);

    return function cleanup() {
      elem.removeEventListener("keydown", dispatch);
      elem.removeEventListener("keyup", dispatch);
    };
  }, [ref, dispatch]);
}

export function useGhost(ref, ghost, dispatch) {
  useEffect(() => {
    const elem = ref.current;
    if (!elem || !ghost) return;
    const { key, code, target } = ghost;

    if (!ALPHANUMERICS.has(code)) return;

    const cursor = target.selectionStart;
    const prefix = elem.value.slice(0, cursor) || "";
    const suffix = elem.value.slice(cursor) || "";
    elem.value = prefix + key + suffix;
    elem.setSelectionRange(cursor + 1, cursor + 1);
  }, [ref, ghost, dispatch]);
}

export function butterflyReducer(state, event) {
  const handler = handlers[event.type];
  const nextState = handler ? handler(state, event) : state;
  return nextState;
}

export function useButterfly() {
  const ref = useRef();
  const [state, dispatch] = useReducer(butterflyReducer, {
    keys: new Set(),
    params: new URLSearchParams(location.search),
  });

  // On mount, listen for URL query string updates
  usePopstateListener(window, dispatch);

  // Sync params to location.search
  useParamSync(state.params);

  // If params are empty, randomize them
  useInitialParams(state.params, dispatch);

  // Bind event listeners to the input element
  useKeyboardListeners(ref, dispatch);

  // Update the input value and selection range after a ghost keypress
  useGhost(ref, state.ghost, dispatch);

  return [state, dispatch, ref];
}
