import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import { COL } from "../data/crew.js";

const WC = [COL[0], COL[1], COL[3], COL[2]];
const WN = ["Red", "Blue", "Yellow", "Green"];
const LEFT = [0, 1, 2, 3];
const RIGHT = [2, 0, 3, 1];

export default function FixWiring({ ok, onDone }) {
  const [sel, setSel] = useState(null); // { i, s } of the wire waiting for its match
  const [done, setDone] = useState([]);
  const [msg, setMsg] = useState("");
  const [bad, setBad] = useState([]); // keys of the two buttons that just mismatched (shake)
  const [paths, setPaths] = useState({}); // i -> svg path string, measured from the real button positions
  const box = useRef(null);
  const btn = useRef({});
  const badTimer = useRef(0);

  // Measure button centres so the SVG wires always line up, even after a resize.
  function measure() {
    const b = box.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const out = {};
    for (const i of LEFT) {
      const l = btn.current["left" + i];
      const rt = btn.current["right" + i];
      if (!l || !rt) continue;
      const a = l.getBoundingClientRect();
      const c = rt.getBoundingClientRect();
      const x1 = a.left + a.width / 2 - r.left;
      const y1 = a.top + a.height / 2 - r.top;
      const x2 = c.left + c.width / 2 - r.left;
      const y2 = c.top + c.height / 2 - r.top;
      const dx = (x2 - x1) * 0.5;
      out[i] = `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
    }
    setPaths(out);
  }
  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  useEffect(() => () => clearTimeout(badTimer.current), []);

  function click(i, s) {
    if (done.includes(i)) return;
    if (!sel) return setSel({ i, s });
    if (sel.s === s) return setSel({ i, s }); // same side: just switch selection
    if (sel.i === i) {
      const nd = [...done, i];
      setDone(nd);
      setSel(null);
      if (nd.length === 4) {
        setMsg("All wires fixed!");
        onDone();
      } else setMsg(nd.length + " of 4 connected");
    } else {
      setBad([sel.s + sel.i, s + i]);
      clearTimeout(badTimer.current);
      badTimer.current = setTimeout(() => setBad([]), 450);
      setSel(null);
      setMsg("Wrong match. Try again.");
    }
  }

  const wire = (i, s) => {
    const k = s + i;
    return (
      <button
        key={k}
        ref={(el) => (btn.current[k] = el)}
        type="button"
        className={
          "wb" +
          (sel && sel.i === i && sel.s === s ? " sel" : "") +
          (done.includes(i) ? " dn" : "") +
          (bad.includes(k) ? " bad" : "")
        }
        style={{ "--c": WC[i] }}
        aria-label={WN[i] + " wire, " + s}
        onClick={() => click(i, s)}
      />
    );
  };

  const all = done.length === 4;

  return (
    <Reveal className={"tk" + (ok ? " ok" : "")} id="t1">
      <h3>Fix wiring</h3>
      <p>Click a color on the left, then its match on the right.</p>
      <div className={"wr" + (all ? " all" : "")} id="wr" ref={box}>
        <svg className="wsvg" aria-hidden="true">
          {done.map((i) =>
            paths[i] ? (
              <g key={i} style={{ "--c": WC[i] }}>
                <path className="w-out" d={paths[i]} pathLength="1" />
                <path className="w-in" d={paths[i]} pathLength="1" />
                <path className="w-spark" d={paths[i]} pathLength="1" />
              </g>
            ) : null
          )}
        </svg>
        <div>{LEFT.map((i) => wire(i, "left"))}</div>
        <div>{RIGHT.map((i) => wire(i, "right"))}</div>
      </div>
      <div className="msg" id="m1">{msg}</div>
    </Reveal>
  );
}
