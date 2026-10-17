import { useEffect, useRef } from "react";

const T = new Date("2026-11-14T19:00:00+05:30").getTime();
const UNITS = [["d", "days"], ["h", "hours"], ["m", "minutes"], ["s", "seconds"]];
const pad = (n) => String(n).padStart(2, "0");

// Updates the four numbers once a second and replays the "tick" animation when one changes.
export default function Countdown() {
  const refs = useRef({});

  useEffect(() => {
    const last = {};
    function cd() {
      const r = Math.max(0, T - Date.now());
      const v = { d: Math.floor(r / 864e5), h: Math.floor(r / 36e5) % 24, m: Math.floor(r / 6e4) % 60, s: Math.floor(r / 1e3) % 60 };
      for (const k in v) {
        const el = refs.current[k];
        const p = pad(v[k]);
        if (el.textContent !== p) {
          el.textContent = p;
          if (last[k] !== undefined) {
            el.classList.remove("tick");
            void el.offsetWidth;
            el.classList.add("tick");
          }
        }
        last[k] = p;
      }
    }
    cd();
    const id = setInterval(cd, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="count" role="timer" aria-label="Time until the event">
      {UNITS.map(([k, label]) => (
        <div className="cd" key={k}>
          <b ref={(el) => (refs.current[k] = el)}>00</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
