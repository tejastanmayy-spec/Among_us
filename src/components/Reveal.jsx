import { createContext, useContext, useEffect, useRef, useState } from "react";

// Hands out a running index so the stagger delay follows page order, like the original.
const Counter = createContext({ current: 0 });

export function RevealProvider({ children }) {
  const counter = useRef(0);
  return <Counter.Provider value={counter}>{children}</Counter.Provider>;
}

// Fades and slides an element in the first time it is 15% visible.
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const idx = useRef(null);
  const counter = useContext(Counter);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (idx.current === null) idx.current = counter.current++;
    el.style.transitionDelay = (idx.current % 4) * 0.09 + "s";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [counter]);

  return (
    <Tag ref={ref} className={`${className} rv${seen ? " in" : ""}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
