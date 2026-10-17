import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import { COL } from "../data/crew.js";

const PN = ["Red", "Blue", "Green", "Yellow"];

// Simon-style memory game: watch 4 lights, repeat the order.
export default function Calibrate({ ok, onDone }) {
  const [msg, setMsg] = useState("");
  const [lit, setLit] = useState([false, false, false, false]);
  const seq = useRef([]);
  const inp = useRef([]);
  const busy = useRef(false);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const setPad = (i, v) => setLit((l) => l.map((x, k) => (k === i ? v : x)));
  function flash(i) {
    setPad(i, true);
    later(() => setPad(i, false), 300);
  }

  function show() {
    if (busy.current) return;
    seq.current = [];
    inp.current = [];
    for (let i = 0; i < 4; i++) seq.current.push(Math.floor(Math.random() * 4));
    busy.current = true;
    setMsg("Watch the lights...");
    seq.current.forEach((v, k) => later(() => flash(v), 500 + k * 650));
    later(() => {
      busy.current = false;
      setMsg("Your turn.");
    }, 500 + 4 * 650);
  }

  function press(i) {
    if (busy.current || !seq.current.length) return;
    flash(i);
    inp.current.push(i);
    if (seq.current[inp.current.length - 1] !== i) {
      setMsg("Wrong order. Press Show sequence.");
      seq.current = [];
      inp.current = [];
      return;
    }
    if (inp.current.length === seq.current.length) {
      setMsg("Calibrated!");
      seq.current = [];
      onDone();
    }
  }

  return (
    <Reveal className={"tk" + (ok ? " ok" : "")} id="t3">
      <h3>Calibrate</h3>
      <p>Watch the lights, then repeat the order.</p>
      <div className="pads" id="pads">
        {PN.map((n, i) => (
          <button key={n} type="button" className={"pad" + (lit[i] ? " lit" : "")} style={{ "--c": COL[i] }} aria-label={n + " light"} onClick={() => press(i)} />
        ))}
      </div>
      <button className="btn sm dk" id="cal" type="button" onClick={show}>Show sequence</button>
      <div className="msg" id="m3" aria-live="polite">{msg}</div>
    </Reveal>
  );
}
