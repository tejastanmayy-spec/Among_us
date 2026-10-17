import { forwardRef } from "react";

// The SVG symbol is defined once and reused everywhere with <use href="#cm">.
const BODY = "M24 34C24 18 36 8 50 8S74 18 74 34V82Q74 92 64 92H58Q54 92 54 88V80H44V88Q44 92 40 92H34Q24 92 24 82Z";
const LINE = "#0b0d1a";

// Two-tone sprite: main color, a darker shade on the edges, a glossy visor.
// The shade and highlight are black/white overlays, so it works with any --c color.
export function CrewmateSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <clipPath id="cmBody"><path d={BODY} /></clipPath>
        <clipPath id="cmPack"><rect x="8" y="36" width="20" height="42" rx="9" /></clipPath>
        <linearGradient id="cmVisor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4eef8" />
          <stop offset="1" stopColor="#7eb3cc" />
        </linearGradient>
      </defs>
      <symbol id="cm" viewBox="0 0 100 100">
        <rect x="8" y="36" width="20" height="42" rx="9" fill="var(--c)" />
        <rect x="8" y="36" width="20" height="42" rx="9" fill="#000" opacity=".32" />
        <rect x="8" y="36" width="20" height="42" rx="9" fill="none" stroke={LINE} strokeWidth="5" />
        <path d={BODY} fill="var(--c)" />
        <g clipPath="url(#cmBody)">
          <path fillRule="evenodd" fill="#000" opacity=".3" d="M0 0H100V100H0Z M29 40a17 31 0 1 0 34 0a17 31 0 1 0 -34 0Z" />
          <path fill="#fff" opacity=".22" d="M30 24C34 14 42 11 48 11C40 16 35 24 34 34C32 32 30 28 30 24Z" />
        </g>
        <path d={BODY} fill="none" stroke={LINE} strokeWidth="5" strokeLinejoin="round" />
        <rect x="46" y="19" width="44" height="27" rx="13.5" fill="url(#cmVisor)" stroke={LINE} strokeWidth="5" />
        <ellipse cx="62" cy="27.5" rx="11" ry="4.2" fill="#fff" opacity=".92" />
        <ellipse cx="80" cy="38" rx="3.5" ry="2" fill="#fff" opacity=".35" />
      </symbol>
    </svg>
  );
}

export const Crewmate = forwardRef(function Crewmate({ color, className = "", style, ...rest }, ref) {
  return (
    <svg ref={ref} className={("cm " + className).trim()} style={{ "--c": color, ...style }} viewBox="0 0 100 100" aria-hidden="true" {...rest}>
      <use href="#cm" />
    </svg>
  );
});
