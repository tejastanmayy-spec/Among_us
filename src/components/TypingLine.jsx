import { useEffect, useRef } from "react";
import { RM } from "../lib/motion.js";

const LINES = ["Task: fix the wiring", "Task: swipe your card", "Task: upload data", "Warning: Red was seen near vents"];

// Types and deletes the lines in a loop. Text is written straight to the node (no re-render every 55ms).
export default function TypingLine() {
  const ref = useRef(null);

  useEffect(() => {
    const ty = ref.current;
    if (RM) {
      ty.textContent = LINES[0];
      return;
    }
    let li = 0, ci = 0, del = false, timer;
    function typ() {
      const w = LINES[li];
      ty.textContent = w.slice(0, ci);
      if (!del && ci < w.length) ci++;
      else if (!del) {
        del = true;
        timer = setTimeout(typ, 1400);
        return;
      } else if (ci > 0) ci--;
      else {
        del = false;
        li = (li + 1) % LINES.length;
      }
      timer = setTimeout(typ, del ? 25 : 55);
    }
    typ();
    return () => clearTimeout(timer);
  }, []);

  return <div className="type" id="type" aria-hidden="true" ref={ref}></div>;
}
