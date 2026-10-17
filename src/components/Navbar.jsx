import { useEffect, useLayoutEffect, useState } from "react";
import { Crewmate } from "./Crewmate.jsx";

const LINKS = [["#about", "About"], ["#smalltasks", "Tasks"], ["#schedule", "Day 1"], ["#finale", "Day 2"]];
const MAP = [
  ["#about", "Cafeteria", "About"],
  ["#smalltasks", "Electrical", "Small tasks"],
  ["#schedule", "Navigation", "Day 1"],
  ["#finale", "Reactor", "Day 2 finale"],
  ["#meeting", "Emergency", "Red button"],
  ["#register", "Admin", "Register"],
];

function savedTheme() {
  try {
    return localStorage.getItem("th") === "light" ? "light" : "dark";
  } catch (e) {
    return "dark";
  }
}

export default function Navbar() {
  const [theme, setTheme] = useState(savedTheme);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
  }, [theme]);

  // Any click outside the map button closes the map.
  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("th", next);
    } catch (e) {
      /* storage can be blocked */
    }
  }

  return (
    <header>
      <nav>
        <div className="wrap">
          <a className="logo" href="#top"><Crewmate color="#F45858" />Among Us Live Night</a>
          <ul>
            {LINKS.map(([href, label]) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
          <div className="nr">
            <div className="mapw">
              <button
                className="ibtn"
                id="mb"
                type="button"
                aria-expanded={open}
                aria-controls="map"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((o) => !o);
                }}
              >
                Ship map
              </button>
              <div className={"map" + (open ? " open" : "")} id="map">
                {MAP.map(([href, place, note]) => (
                  <a key={href} href={href}>{place}<small>{note}</small></a>
                ))}
              </div>
            </div>
            <button className="ibtn" id="th" type="button" onClick={toggleTheme}>
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
            <a className="btn sm" href="#register">Join the crew</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
