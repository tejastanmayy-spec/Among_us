import { RM } from "./motion.js";

export function confetti(colors, n) {
  if (RM) return;
  for (let i = 0; i < n; i++) {
    const c = document.createElement("i");
    c.className = "cf";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 1.8 + Math.random() * 2 + "s";
    c.style.animationDelay = Math.random() * 0.5 + "s";
    c.style.borderRadius = i % 2 ? "50%" : "2px";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4500);
  }
}

let ac;
export function siren() {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "square";
    g.gain.value = 0.05;
    o.connect(g);
    g.connect(ac.destination);
    const t = ac.currentTime;
    for (let i = 0; i < 6; i++) o.frequency.setValueAtTime(i % 2 ? 520 : 760, t + i * 0.3);
    o.start(t);
    o.stop(t + 1.8);
  } catch (e) {
    /* sound is optional */
  }
}

// Restart a CSS animation that is driven by the "go" class.
export function restartAnimation(el) {
  el.classList.remove("go");
  void el.offsetWidth;
  el.classList.add("go");
}

// Button ripple. Attached once on document and works for every .btn.
export function ripple(e) {
  const b = e.target.closest && e.target.closest(".btn");
  if (!b) return;
  const r = b.getBoundingClientRect();
  const s = Math.max(r.width, r.height);
  const d = document.createElement("span");
  d.className = "rip";
  d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.appendChild(d);
  setTimeout(() => d.remove(), 600);
}
