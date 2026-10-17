import { useCallback, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import FixWiring from "./FixWiring.jsx";
import SwipeCard from "./SwipeCard.jsx";
import Calibrate from "./Calibrate.jsx";
import { COL } from "../data/crew.js";
import { confetti } from "../lib/fx.js";
import { useFx } from "../lib/FxContext.jsx";

export default function SmallTasks() {
  const { toast } = useFx();
  const [done, setDone] = useState([false, false, false]);
  const [shield, setShield] = useState(false);
  const seen = useRef([false, false, false]);
  const count = useRef(0);

  // Each finished task earns one stamp; three stamps unlock the Shield.
  const stamp = useCallback(
    (i) => {
      if (seen.current[i]) return;
      seen.current[i] = true;
      setDone((d) => d.map((v, k) => (k === i ? true : v)));
      count.current++;
      toast("Stamp " + count.current + " of 3 collected");
      if (count.current === 3) {
        setShield(true);
        confetti(COL, 80);
      }
    },
    [toast]
  );

  return (
    <section id="smalltasks">
      <div className="wrap">
        <Reveal as="h2">Small tasks. Try them now.</Reveal>
        <Reveal as="p" className="sub">Every crewmate finishes quick tasks between rounds. Beat all three below to collect 3 stamps and unlock your Shield.</Reveal>
        <Reveal className="stampbar">
          {[0, 1, 2].map((i) => (
            <div key={i} className={"stp" + (done[i] ? " on" : "")} id={"s" + i} aria-label={"Stamp " + (i + 1)}>★</div>
          ))}
          <span className={"shield" + (shield ? " on" : "")} id="shield">{shield ? "Shield unlocked!" : "Shield locked"}</span>
        </Reveal>
        <div className="tg">
          <FixWiring ok={done[0]} onDone={() => stamp(0)} />
          <SwipeCard ok={done[1]} onDone={() => stamp(1)} />
          <Calibrate ok={done[2]} onDone={() => stamp(2)} />
        </div>
      </div>
    </section>
  );
}
