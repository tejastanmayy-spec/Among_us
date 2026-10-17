import Reveal from "./Reveal.jsx";
import { RM } from "../lib/motion.js";

const CARDS = [
  {
    bg: "var(--red)",
    title: "What",
    text: "A live Among Us tournament with 4 rounds and 4 lobbies of 10 players. One impostor per lobby.",
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z" />
      </>
    ),
  },
  {
    bg: "var(--yellow)",
    title: "When",
    text: "Day 1 qualifiers on Saturday 14 November and the Day 2 finale on Sunday 15 November 2026. Lobby opens at 6:30 PM IST.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    bg: "var(--green)",
    title: "Where",
    text: "Online. You play Among Us on your own device and talk to your lobby on Discord voice.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" />
      </>
    ),
  },
  {
    bg: "var(--blue)",
    title: "Who",
    text: "Anyone can join and it is free. The winning crew and the best liar get a trophy badge.",
    icon: (
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1.2 1.2C7.8 18.6 7 20.2 7 22M14 14.7V17c0 .6.5 1 1.2 1.2 1 .4 1.8 2 1.8 3.8M18 2H6v7a6 6 0 0 0 12 0z" />
    ),
  },
];

// 3D tilt and a light sweep that follows the mouse.
function tilt(e) {
  if (RM) return;
  const c = e.currentTarget;
  const r = c.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  c.style.transform = "perspective(700px) rotateY(" + (x - 0.5) * 16 + "deg) rotateX(" + (0.5 - y) * 16 + "deg) translateY(-6px)";
  c.style.setProperty("--mx", x * 100 + "%");
  c.style.setProperty("--my", y * 100 + "%");
}
function untilt(e) {
  e.currentTarget.style.transform = "";
}

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal as="h2">What’s the mission?</Reveal>
        <Reveal as="p" className="sub">Four rounds of tasks, lies and votes. Play with friends or get matched with new crewmates.</Reveal>
        <div className="grid">
          {CARDS.map((c) => (
            <Reveal key={c.title} className="card" onMouseMove={tilt} onMouseLeave={untilt}>
              <div className="ic" style={{ background: c.bg }}>
                <svg className="i" viewBox="0 0 24 24">{c.icon}</svg>
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
