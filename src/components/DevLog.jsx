import Reveal from "./Reveal.jsx";

const LOG = [
  {
    v: "v0.4", date: "Oct 2026", tag: "latest",
    items: [
      "Fix wiring now draws real wires between the plugs, with a spark that runs along them once all four are fixed.",
      "Wrong wire match shakes both plugs so you can see what went wrong.",
      "New cursor panel (bottom-left): pick Dog, Arrow or Default, change size and color, or reset to the plain white cursor.",
      "Form examples now use Tanmay, 26U030020 and 9135103078.",
    ],
  },
  {
    v: "v0.3", date: "Oct 2026",
    items: [
      "Pet dog cursor: follows the pointer, faces the way you move, runs, barks on click.",
      "Emergency meeting button and kill scene for the Impostor role.",
    ],
  },
  {
    v: "v0.2", date: "Oct 2026",
    items: [
      "Small tasks section: wiring, swipe card and calibrate, with stamps that unlock the Shield.",
      "Registration form with color and role picker, plus validation.",
    ],
  },
  {
    v: "v0.1", date: "Oct 2026",
    items: [
      "First build: hero, countdown, schedule and starfield background.",
      "Ported from a single HTML file to React + Vite.",
    ],
  },
];

const KNOWN = [
  "Custom cursors are only used on mouse devices; touch screens keep the normal pointer.",
  "Nobody has ever beaten the swipe card on the first try. We checked.",
];

export default function DevLog() {
  return (
    <section id="devlog" className="devlog">
      <div className="wrap">
        <Reveal as="h2">Developer log</Reveal>
        <Reveal as="p" className="sub">What changed on this site, newest first.</Reveal>
        <Reveal className="dl-term">
          <div className="dl-bar"><i /><i /><i /><span>crew@among-us-live-night: ~/devlog</span></div>
          <div className="dl-body">
            {LOG.map((e) => (
              <article key={e.v} className="dl-entry">
                <h3>
                  <span className="dl-v">{e.v}</span> <time>{e.date}</time>
                  {e.tag && <em>{e.tag}</em>}
                </h3>
                <ul>
                  {e.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            ))}
            <article className="dl-entry">
              <h3><span className="dl-v warn">Known issues</span></h3>
              <ul>
                {KNOWN.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </article>
            <div className="dl-prompt">$ <span className="dl-caret" /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
