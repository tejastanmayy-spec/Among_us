import { useEffect, useRef } from "react";
import Reveal from "./Reveal.jsx";
import { Crewmate } from "./Crewmate.jsx";

const STEPS = [
  ["6:30 PM", "Lobby opens", "Join the Discord server and get your lobby code."],
  ["7:00 PM", "Briefing", "We explain the rules and the maps for the night."],
  ["7:20 PM", "Rounds 1 and 2", "Play two games in your lobby. Winners move on."],
  ["8:40 PM", "Final round", "The best crews from every lobby meet in one big game."],
  ["9:15 PM", "Awards", "Trophy badges, best liar and one final emergency meeting."],
];

export default function Schedule() {
  const tl = useRef(null);
  const fill = useRef(null);

  // Scroll-driven: steps get a checkmark once they pass 65% of the viewport, the green line grows.
  useEffect(() => {
    const steps = tl.current.querySelectorAll(".step");
    function fx() {
      const r = tl.current.getBoundingClientRect();
      const y = innerHeight * 0.65;
      steps.forEach((s) => s.classList.toggle("on", s.getBoundingClientRect().top < y));
      fill.current.style.height = Math.min(Math.max(y - r.top, 0), r.height - 12) + "px";
    }
    addEventListener("scroll", fx, { passive: true });
    fx();
    return () => removeEventListener("scroll", fx);
  }, []);

  return (
    <section id="schedule">
      <div className="wrap two">
        <div>
          <Reveal as="h2">Day 1: the qualifiers</Reveal>
          <Reveal as="p" className="sub">Scroll down and watch each task get completed, one by one.</Reveal>
          <Crewmate color="#8DD982" style={{ width: 150, animation: "bob2 2.4s infinite" }} />
        </div>
        <div className="tl" id="tl" ref={tl}>
          <div className="fill" id="fill" ref={fill}></div>
          {STEPS.map(([time, title, text]) => (
            <div className="step" key={time}>
              <time>{time}</time>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
