import { useEffect, useRef, useState } from "react";
import { Crewmate } from "./Crewmate.jsx";
import { COL, NAMES } from "../data/crew.js";
import { useFx } from "../lib/FxContext.jsx";

function Walker({ i, onEject, onRelease }) {
  const [out, setOut] = useState(false);
  const busy = useRef(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  function eject() {
    if (busy.current) return;
    busy.current = true;
    setOut(true);
    onEject(NAMES[i]);
    timer.current = setTimeout(() => {
      busy.current = false;
      setOut(false);
      onRelease();
    }, 4500);
  }

  return (
    <div
      className={"walker" + (out ? " out" : "")}
      role="button"
      tabIndex={0}
      aria-label={NAMES[i] + " crewmate. Activate to eject."}
      style={{ animationDuration: 16 + i * 3 + "s", animationDelay: -i * 4.5 + "s" }}
      onClick={eject}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          eject();
        }
      }}
    >
      <Crewmate color={COL[i]} />
    </div>
  );
}

// The floor at the bottom of the hero: six crewmates walk past, click one to eject it.
export default function Walkers() {
  const { toast } = useFx();
  const ejected = useRef(0);

  function onEject(name) {
    ejected.current++;
    const left = 6 - ejected.current;
    toast(name + " was not an impostor. " + (left > 0 ? left + " remain." : "Everyone is gone!"));
  }
  function onRelease() {
    ejected.current = Math.max(0, ejected.current - 1);
  }

  return (
    <div className="floor" id="floor">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Walker key={i} i={i} onEject={onEject} onRelease={onRelease} />
      ))}
    </div>
  );
}
