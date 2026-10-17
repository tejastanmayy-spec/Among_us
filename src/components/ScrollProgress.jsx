import { useEffect, useRef, useState } from "react";

// Top progress bar and the "Tasks: N%" pill.
export default function ScrollProgress() {
  const bar = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function fx() {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - innerHeight || 1);
      bar.current.style.width = p * 100 + "%";
      setPct(Math.round(p * 100));
    }
    addEventListener("scroll", fx, { passive: true });
    fx();
    return () => removeEventListener("scroll", fx);
  }, []);

  return (
    <>
      <div id="prog" ref={bar}></div>
      <div id="tasks" aria-hidden="true">Tasks: <span id="pct">{pct}</span>%</div>
    </>
  );
}
