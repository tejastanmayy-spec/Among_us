import { useEffect } from "react";
import { RM } from "../lib/motion.js";

const WORDS = ["CAUGHT!", "SUS!", "VENTED!", "NOT ME!", "EJECTED!", "SKIP!", "WHERE?!", "RED SUS!"];

// A comic-style word pops up and floats away wherever you click.
export default function ClickWords() {
  useEffect(() => {
    let lastWord = "";
    function onClick(e) {
      if (RM || e.detail === 0) return; // no motion, or keyboard "click"
      if (e.target.closest && e.target.closest("input,select,textarea,label,#black")) return;
      let w;
      do w = WORDS[Math.floor(Math.random() * WORDS.length)];
      while (w === lastWord);
      lastWord = w;
      const el = document.createElement("div");
      el.className = "pop";
      el.textContent = w;
      el.dataset.t = w;
      el.style.left = Math.min(Math.max(e.clientX, 80), innerWidth - 80) + "px";
      el.style.top = e.clientY + "px";
      el.style.setProperty("--r", Math.round(Math.random() * 24 - 14) + "deg");
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
