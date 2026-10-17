import { useCallback, useEffect, useRef, useState } from "react";
import { Crewmate } from "./Crewmate.jsx";
import { RM } from "../lib/motion.js";

const SAY = ["Where were you?", "Not me!", "I saw Blue vent.", "Skip vote?", "Wait, who is red?"];

// The spaceship window with the floating crewmate. Click it (or press Enter) and it talks.
export default function HeroWindow() {
  const [text, setText] = useState(SAY[0]);
  const [on, setOn] = useState(false);
  const idx = useRef(0);
  const svg = useRef(null);

  const talk = useCallback(() => {
    setText(SAY[idx.current++ % SAY.length]);
    setOn(true);
    setTimeout(() => setOn(false), 1800);
  }, []);

  useEffect(() => {
    if (RM) return;
    const id = setInterval(talk, 6000);
    return () => clearInterval(id);
  }, [talk]);

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    svg.current.style.transform = "rotate(" + x * 14 + "deg)";
  }

  return (
    <div className="win" id="win" onMouseMove={onMouseMove}>
      <div className="planet p1"></div>
      <div className="planet p2"></div>
      <div
        className={"hero-cm" + (on ? " say-on" : "")}
        id="hcm"
        tabIndex={0}
        role="button"
        aria-label="Click the crewmate"
        onClick={talk}
        onKeyDown={(e) => {
          if (e.key === "Enter") talk();
        }}
      >
        <div className="say" id="say">{text}</div>
        <Crewmate ref={svg} id="hsvg" color="#F45858" />
      </div>
    </div>
  );
}
