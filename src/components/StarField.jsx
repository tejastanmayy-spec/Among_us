import { useEffect, useRef } from "react";
import { RM } from "../lib/motion.js";
import { COL } from "../data/crew.js";

export default function StarField() {
  const ref = useRef(null);

  // Canvas: twinkling stars, shooting stars, mouse parallax.
  useEffect(() => {
    const cv = ref.current;
    const cx = cv.getContext("2d");
    const sh = [];
    let S = [], W, H, mx = 0, my = 0, raf;

    function size() {
      W = cv.width = innerWidth;
      H = cv.height = innerHeight;
      S = [];
      for (let i = 0; i < 170; i++) S.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * 2 + 0.3, t: Math.random() * 6 });
    }
    function onMove(e) {
      mx = e.clientX / W - 0.5;
      my = e.clientY / H - 0.5;
    }
    function draw(t) {
      cx.clearRect(0, 0, W, H);
      for (let i = 0; i < S.length; i++) {
        const s = S[i];
        if (!RM) {
          s.x -= s.z * 0.15;
          if (s.x < 0) s.x = W;
        }
        const a = 0.5 + 0.5 * Math.sin(t / 700 + s.t);
        cx.globalAlpha = 0.3 + a * 0.7;
        cx.fillStyle = i % 9 == 0 ? "#FFD166" : i % 7 == 0 ? "#67C9F5" : "#fff";
        cx.beginPath();
        cx.arc(s.x - mx * s.z * 30, s.y - my * s.z * 30, s.z * 0.9, 0, 7);
        cx.fill();
      }
      if (!RM && Math.random() < 0.008) sh.push({ x: Math.random() * W, y: Math.random() * H * 0.5, l: 0 });
      cx.globalAlpha = 1;
      for (let j = sh.length - 1; j >= 0; j--) {
        const q = sh[j];
        q.x += 14;
        q.y += 6;
        q.l++;
        const g = cx.createLinearGradient(q.x, q.y, q.x - 90, q.y - 40);
        g.addColorStop(0, "#fff");
        g.addColorStop(1, "#fff0");
        cx.strokeStyle = g;
        cx.lineWidth = 2;
        cx.beginPath();
        cx.moveTo(q.x, q.y);
        cx.lineTo(q.x - 90, q.y - 40);
        cx.stroke();
        if (q.l > 60) sh.splice(j, 1);
      }
      raf = requestAnimationFrame(draw);
    }

    size();
    addEventListener("resize", size);
    addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
      removeEventListener("mousemove", onMove);
    };
  }, []);

  // Cursor sparkle trail.
  useEffect(() => {
    let lt = 0;
    function onMove(e) {
      const n = Date.now();
      if (RM || n - lt < 70) return;
      lt = n;
      const s = document.createElement("i");
      s.className = "spark";
      s.style.left = e.clientX - 6 + "px";
      s.style.top = e.clientY - 6 + "px";
      s.style.background = COL[Math.floor(Math.random() * COL.length)];
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    }
    addEventListener("mousemove", onMove);
    return () => removeEventListener("mousemove", onMove);
  }, []);

  return <canvas id="stars" ref={ref} aria-hidden="true"></canvas>;
}
