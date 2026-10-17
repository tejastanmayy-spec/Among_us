import { useEffect, useRef, useState } from "react";
import petUrl from "../assets/pet-dog.png";
import { RM } from "../lib/motion.js";

const CLICKABLE = "a,button,[role=button],select,label,input[type=checkbox],input[type=radio],.crd,.walker,.hero-cm";
const TEXT = "input[type=text],input[type=email],input[type=tel],textarea";

const KEY = "aul-cursor";
const DEFAULTS = { mode: "dog", size: 1, color: "" }; // color "" = original
const SWATCHES = ["", "#ffffff", "#F45858", "#67C9F5", "#8DD982", "#FFD166", "#B8A5F5", "#FF9BD2"];

function load() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...DEFAULTS };
  }
}

function hue(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (!d) return 0;
  let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (h * 60 + 360) % 360;
}
// The dog is teal (~190deg), so tint it by rotating the hue toward the picked color. White/grey become a pale dog.
function dogFilter(c) {
  if (!c) return "none";
  const sat = Math.max(...[1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))) - Math.min(...[1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)));
  if (sat < 24) return "grayscale(1) brightness(1.9)";
  return "hue-rotate(" + Math.round(hue(c) - 190) + "deg) saturate(1.3)";
}

// The dog is the cursor. It trails the pointer a tiny bit, faces the way you move, runs when you move fast,
// gets excited over clickable things and squashes when you click.
export default function PetCursor() {
  const root = useRef(null);
  const flip = useRef(null);
  const fine = typeof matchMedia !== "undefined" && matchMedia("(hover:hover) and (pointer:fine)").matches;
  const [cfg, setCfg] = useState(load);
  const [open, setOpen] = useState(false);
  const cfgRef = useRef(cfg);

  // Apply settings: size/color go to CSS variables, "system" mode gives the normal arrow back.
  useEffect(() => {
    cfgRef.current = cfg;
    const h = document.documentElement;
    h.style.setProperty("--k", cfg.size);
    h.style.setProperty("--pet-color", cfg.color || "#ffffff");
    h.style.setProperty("--pet-filter", dogFilter(cfg.color));
    h.classList.toggle("has-pet", fine && cfg.mode !== "system");
    h.dataset.cursor = cfg.mode;
    try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch {}
  }, [cfg, fine]);
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));

  useEffect(() => {
    if (!fine) return; // touch devices keep their normal behaviour
    const el = root.current;
    const fl = flip.current;
    let tx = 0, ty = 0, x = 0, y = 0, px = 0, face = 1, raf = 0;
    let seen = false, run = false, hot = false;
    const flag = (c, on) => el.classList.toggle(c, on);

    function onMove(e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        x = px = tx;
        y = ty;
        flag("show", true);
      }
      const t = e.target;
      const overText = !!(t.closest && t.closest(TEXT));
      const overHot = !overText && !!(t.closest && t.closest(CLICKABLE));
      flag("hide", overText);
      if (overHot !== hot) {
        hot = overHot;
        flag("hot", hot);
      }
    }
    function onOut(e) {
      if (!e.relatedTarget) {
        seen = false;
        flag("show", false);
      }
    }
    function onDown() {
      el.classList.remove("bark");
      void el.offsetWidth;
      el.classList.add("bark");
    }
    function frame() {
      const k = RM || cfgRef.current.mode !== "dog" ? 1 : 0.4; // the arrow sticks to the pointer exactly
      x += (tx - x) * k;
      y += (ty - y) * k;
      const vx = x - px;
      px = x;
      if (Math.abs(vx) > 0.6) {
        const f = vx > 0 ? 1 : -1;
        if (f !== face) {
          face = f;
          fl.style.setProperty("--f", f);
        }
      }
      const running = Math.abs(tx - x) + Math.abs(ty - y) > 3;
      if (running !== run) {
        run = running;
        flag("run", run);
      }
      fl.style.setProperty("--lean", Math.min(Math.abs(vx) * 1.1, 14) + "deg");
      el.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      raf = requestAnimationFrame(frame);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.documentElement.classList.remove("has-pet");
    };
  }, [fine]);

  const modes = [["dog", "Dog"], ["arrow", "Arrow"], ["system", "Default"]];
  return (
    <>
      <div className="pet" ref={root} aria-hidden="true">
        <div className="pet-flip" ref={flip}>
          <div className="pet-pop">
            <img className="pet-img" src={petUrl} alt="" draggable="false" />
          </div>
        </div>
        <svg className="pet-arrow" viewBox="0 0 24 24" width="24" height="24">
          <path d="M3 2 L3 19 L8 14.5 L11.5 22 L14.5 20.6 L11.2 13.2 L18 13 Z" />
        </svg>
      </div>
      {fine && (
        <div className={"cs" + (open ? " open" : "")}>
          {open && (
            <div className="cs-panel" role="dialog" aria-label="Cursor settings">
              <b>Cursor</b>
              <div className="cs-seg" role="group" aria-label="Cursor style">
                {modes.map(([m, l]) => (
                  <button key={m} type="button" className={cfg.mode === m ? "on" : ""} onClick={() => set({ mode: m })}>{l}</button>
                ))}
              </div>
              <label className={cfg.mode === "system" ? "off" : ""}>
                Size <span>{Math.round(cfg.size * 100)}%</span>
                <input type="range" min="0.6" max="2.5" step="0.1" value={cfg.size} disabled={cfg.mode === "system"} onChange={(e) => set({ size: +e.target.value })} />
              </label>
              <div className={"cs-sw" + (cfg.mode === "system" ? " off" : "")} role="group" aria-label="Cursor color">
                {SWATCHES.map((c) => (
                  <button key={c || "orig"} type="button" className={(cfg.color === c ? "on " : "") + (c ? "" : "orig")} style={c ? { background: c } : undefined} aria-label={c ? "Color " + c : "Original color"} title={c ? c : "Original"} disabled={cfg.mode === "system"} onClick={() => set({ color: c })} />
                ))}
                <input type="color" aria-label="Custom color" value={cfg.color || "#ffffff"} disabled={cfg.mode === "system"} onChange={(e) => set({ color: e.target.value })} />
              </div>
              <button type="button" className="cs-reset" onClick={() => set({ mode: "arrow", size: 1, color: "#ffffff" })}>Reset to default white cursor</button>
            </div>
          )}
          <button type="button" className="cs-fab" aria-expanded={open} aria-label="Cursor settings" onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 3 L5 19 L9.5 15 L12.5 21 L14.8 20 L11.8 14 L18 13.6 Z" fill="currentColor" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
