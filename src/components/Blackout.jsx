import { useEffect, useRef, useState } from "react";

// Full-screen darkness with a flashlight that follows the mouse. Closes after 20s, Escape, or the button.
export default function Blackout({ open, onClose }) {
  const box = useRef(null);
  const btn = useRef(null);
  const [secs, setSecs] = useState(20);

  useEffect(() => {
    if (!open) return;
    let n = 20;
    setSecs(n);
    btn.current.focus();
    const id = setInterval(() => {
      n--;
      setSecs(n);
      if (n <= 0) onClose();
    }, 1000);
    return () => clearInterval(id);
  }, [open, onClose]);

  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") onClose();
    };
    const move = (e) => {
      box.current.style.setProperty("--x", e.clientX + "px");
      box.current.style.setProperty("--y", e.clientY + "px");
    };
    document.addEventListener("keydown", key);
    addEventListener("mousemove", move);
    return () => {
      document.removeEventListener("keydown", key);
      removeEventListener("mousemove", move);
    };
  }, [onClose]);

  return (
    <div
      id="black"
      ref={box}
      role="dialog"
      aria-label="Blackout"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", visibility: open ? "visible" : "hidden" }}
    >
      <div>
        BLACKOUT!<br />
        <span style={{ font: "500 20px Inter" }}>Close your eyes. <span id="bn">{secs}</span>s left</span><br />
        <button className="btn sm alt" id="bx" ref={btn} type="button" style={{ marginTop: 20 }} onClick={onClose}>Open your eyes</button>
      </div>
    </div>
  );
}
