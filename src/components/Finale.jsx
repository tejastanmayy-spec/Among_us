import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import { COL, NAMES } from "../data/crew.js";
import { confetti } from "../lib/fx.js";
import { useFx } from "../lib/FxContext.jsx";

export default function Finale({ onBlackout }) {
  const { flash } = useFx();
  const [lines, setLines] = useState(null); // null = show the starting hint
  const [bar, setBar] = useState(0);
  const running = useRef(false);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function simulate() {
    if (running.current) return;
    running.current = true;
    setLines([]);
    setBar(0);
    const imp = NAMES[Math.floor(Math.random() * 8)];
    const ej = Math.random() < 0.6 ? imp : NAMES[(NAMES.indexOf(imp) + 3) % 8];
    const win = ej === imp;
    const log = [
      ["00:00", "Lobby locked: 10 players, 1 impostor.", 10],
      ["00:45", "Crew finished 3 tasks.", 30],
      ["01:30", "Body reported near Electrical.", 45],
      ["01:35", "EMERGENCY MEETING called.", 45],
      ["02:20", "Votes: " + ej + " 5, skip 2, others 3.", 55],
      ["02:30", ej + " was ejected. " + (win ? imp + " was the impostor. Crew wins!" : ej + " was not the impostor. Play on."), win ? 100 : 60],
    ];
    log.forEach((l, k) => {
      timers.current.push(
        setTimeout(() => {
          setLines((ls) => [...ls, l[0] + "  " + l[1]]);
          setBar(l[2]);
          if (k === 3) flash();
          if (k === 5) {
            running.current = false;
            if (win) confetti(COL, 60);
          }
        }, k * 1100)
      );
    });
  }

  return (
    <section id="finale">
      <div className="wrap two">
        <div>
          <Reveal as="h2">Day 2: the finale</Reveal>
          <Reveal as="p" className="sub">Everyone who survives Day 1 returns. The rules get meaner and the lights go out once.</Reveal>
          <Reveal as="p" className="fp"><b>Ghost channel.</b> Eliminated players keep watching and talk in their own voice channel.</Reveal>
          <Reveal as="p" className="fp"><b>The blackout.</b> Once in the final, the host calls 20 seconds of lights out. Crewmates stay silent while the impostor moves.</Reveal>
          <button className="btn alt" id="bob" type="button" onClick={onBlackout}>Try the blackout</button>
        </div>
        <Reveal>
          <div className="term" id="term" aria-live="polite">
            {lines === null ? <div>Press the button to simulate one round.</div> : lines.map((t, i) => <div key={i}>{t}</div>)}
          </div>
          <div className="tbar" id="tbar"><b style={{ width: bar + "%" }}></b></div>
          <button className="btn sm" id="simb" type="button" onClick={simulate}>Simulate a round</button>
        </Reveal>
      </div>
    </section>
  );
}
