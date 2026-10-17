import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Crewmate } from "./Crewmate.jsx";
import { COL, NAMES } from "../data/crew.js";

const SCENE_MS = 5600;

// role "crew": a random other color kills you. role "impostor": your color kills a random other color.
export default function KillScene({ name, colorIdx, role, onDone }) {
  const [cast] = useState(() => {
    let other;
    do other = Math.floor(Math.random() * COL.length);
    while (other === colorIdx);
    return role === "impostor" ? { killer: colorIdx, victim: other } : { killer: other, victim: colorIdx };
  });
  const btn = useRef(null);
  const ended = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  function finish() {
    if (ended.current) return;
    ended.current = true;
    doneRef.current();
  }

  useEffect(() => {
    btn.current.focus();
    const t = setTimeout(finish, SCENE_MS);
    const key = (e) => {
      if (e.key === "Escape") finish();
    };
    document.addEventListener("keydown", key);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", key);
    };
  }, []);

  const you = name.length > 14 ? name.slice(0, 13) + "…" : name;
  const caption = role === "impostor" ? "You killed " + NAMES[cast.victim] : NAMES[cast.killer] + " killed you";

  return createPortal(
    <div className="kill" role="dialog" aria-label="Registration result">
      <button ref={btn} className="ibtn ks-skip" type="button" onClick={finish}>Skip</button>
      <div className="ks-stage">
        <div className="ks-floor"></div>
        <div className="ks-char ks-killer">
          <div className="ks-tag">{role === "impostor" ? you : NAMES[cast.killer]}</div>
          <div className="ks-in"><Crewmate color={COL[cast.killer]} /></div>
        </div>
        <div className="ks-knife"></div>
        <div className="ks-splat"></div>
        <div className="ks-char ks-victim">
          <div className="ks-tag">{role === "impostor" ? NAMES[cast.victim] : you}</div>
          <div className="ks-in"><div className="ks-flip"><Crewmate color={COL[cast.victim]} /></div></div>
        </div>
      </div>
      <div className="ks-cap" role="status" aria-live="polite">{caption}</div>
      <div className="ks-ok">Registered successfully</div>
      <div className="ks-flash"></div>
    </div>,
    document.body
  );
}
