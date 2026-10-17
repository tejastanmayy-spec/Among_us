import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { restartAnimation } from "./fx.js";

const FxContext = createContext(null);
export const useFx = () => useContext(FxContext);

// Owns the toast, the red flash and the "EMERGENCY MEETING" banner.
export function FxProvider({ children }) {
  const flashEl = useRef(null);
  const alertEl = useRef(null);
  const timer = useRef(null);
  const [msg, setMsg] = useState("");
  const [on, setOn] = useState(false);

  const toast = useCallback((m) => {
    setMsg(m);
    setOn(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOn(false), 2600);
  }, []);
  const flash = useCallback(() => restartAnimation(flashEl.current), []);
  const meeting = useCallback(() => {
    alertEl.current.textContent = "EMERGENCY MEETING";
    restartAnimation(flashEl.current);
    restartAnimation(alertEl.current);
  }, []);
  const value = useMemo(() => ({ toast, flash, meeting }), [toast, flash, meeting]);

  return (
    <FxContext.Provider value={value}>
      <div id="flash" ref={flashEl}></div>
      <div id="alert" ref={alertEl} role="status" aria-live="assertive"></div>
      <div className={"toast" + (on ? " on" : "")} id="toast" role="status">{msg}</div>
      {children}
    </FxContext.Provider>
  );
}
