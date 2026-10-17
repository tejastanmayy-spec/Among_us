import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

// Drag the card across the reader: between 0.3s and 1.1s counts as a good swipe.
export default function SwipeCard({ ok, onDone }) {
  const [msg, setMsg] = useState("");
  const rdr = useRef(null);
  const crd = useRef(null);
  const drag = useRef(false);
  const t0 = useRef(0);
  const x0 = useRef(0);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  function reset() {
    crd.current.style.transition = "left .4s";
    crd.current.style.left = "6px";
  }
  function finish(ms) {
    if (ms < 300) {
      setMsg("Too fast. Try again.");
      reset();
    } else if (ms > 1100) {
      setMsg("Too slow. Try again.");
      reset();
    } else {
      setMsg("Card accepted!");
      onDone();
    }
  }
  function down(e) {
    const c = crd.current;
    c.setPointerCapture(e.pointerId);
    drag.current = true;
    t0.current = 0;
    x0.current = e.clientX - c.offsetLeft;
    c.style.transition = "none";
  }
  function move(e) {
    if (!drag.current) return;
    const c = crd.current;
    const max = rdr.current.clientWidth - c.offsetWidth - 6;
    const x = Math.min(Math.max(e.clientX - x0.current, 6), max);
    if (!t0.current && x > 20) t0.current = Date.now();
    c.style.left = x + "px";
    if (x >= max - 2) {
      drag.current = false;
      finish(Date.now() - t0.current);
    }
  }
  function up() {
    if (drag.current) {
      drag.current = false;
      setMsg("Bad swipe. Drag all the way across.");
      reset();
    }
  }
  function auto() {
    const c = crd.current;
    c.style.transition = "left .7s";
    c.style.left = rdr.current.clientWidth - c.offsetWidth - 6 + "px";
    timer.current = setTimeout(() => finish(250 + Math.random() * 1000), 720);
  }

  return (
    <Reveal className={"tk" + (ok ? " ok" : "")} id="t2">
      <h3>Swipe card</h3>
      <p>Drag the card to the reader. Not too fast, not too slow.</p>
      <div className="rdr" id="rdr" ref={rdr}>
        <i></i>
        <div className="crd" id="crd" ref={crd} onPointerDown={down} onPointerMove={move} onPointerUp={up}>CARD</div>
      </div>
      <div className="msg" id="m2" aria-live="polite">{msg}</div>
      <button className="btn sm dk" id="auto" type="button" onClick={auto}>Swipe with a button</button>
    </Reveal>
  );
}
