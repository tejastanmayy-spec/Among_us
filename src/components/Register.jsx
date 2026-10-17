import { useState } from "react";
import Reveal from "./Reveal.jsx";
import KillScene from "./KillScene.jsx";
import { Crewmate } from "./Crewmate.jsx";
import { COL, NAMES } from "../data/crew.js";
import { ROLES, YEARS, PROGRAMS } from "../data/form.js";
import { confetti } from "../lib/fx.js";
import { RM } from "../lib/motion.js";
import { useFx } from "../lib/FxContext.jsx";

const EMAIL = /^\S+@\S+\.\S+$/;
const PHONE = /^\+?\d{10,14}$/;
const NO_ERR = { name: "", roll: "", program: "", year: "", phone: "", email: "", agree: "" };

export default function Register() {
  const { toast } = useFx();
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [chosen, setChosen] = useState(0);
  const [role, setRole] = useState(ROLES[0]);
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState(NO_ERR);
  const [scene, setScene] = useState(null); // kill cutscene being played
  const [who, setWho] = useState(null); // set once the seat is saved

  function finish(n) {
    setScene(null);
    setWho(n);
    confetti(COL, 90);
    toast("Seat saved for " + n);
  }

  function submit(e) {
    e.preventDefault();
    if (scene) return;
    const n = name.trim();
    const emailOk = EMAIL.test(email.trim());
    const phoneOk = PHONE.test(phone.replace(/[\s\-()]/g, ""));
    const next = {
      name: n ? "" : "Enter the name your crewmates will see.",
      roll: roll.trim() ? "" : "Enter your roll number.",
      program: program ? "" : "Pick your program.",
      year: year ? "" : "Pick your year of study.",
      phone: phoneOk ? "" : "Enter a valid WhatsApp number, like 9135103078.",
      email: emailOk ? "" : "Enter a valid email, like you@example.com.",
      agree: agree ? "" : "Tick the box to confirm you’ll play fair.",
    };
    setErr(next);
    if (Object.values(next).some(Boolean)) return;
    // Step 2 will send { name, roll, program, year, phone, email, color, role } to Google Sheets here.
    const assigned = role === "Impostor" ? "impostor" : role === "Crewmate" ? "crew" : Math.random() < 0.5 ? "impostor" : "crew";
    if (RM) finish(n);
    else setScene({ name: n, colorIdx: chosen, role: assigned });
  }

  return (
    <section id="register">
      <div className="wrap two">
        <div>
          <Reveal as="h2">Pick your color and join</Reveal>
          <Reveal as="p" className="sub">Fill in the form to save your seat. We’ll send the Discord link and your lobby code by email before the event.</Reveal>
          <Crewmate id="prev" color={COL[chosen]} style={{ width: 170, display: "block", animation: "bob2 2s infinite" }} />
        </div>
        <Reveal className="formbox">
          {who === null ? (
            <form id="form" noValidate onSubmit={submit}>
              <div className="f">
                <label htmlFor="nm">Your name</label>
                <input id="nm" type="text" autoComplete="name" placeholder="Tanmay" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="err" id="e1">{err.name}</div>
              </div>
              <div className="row2">
                <div className="f">
                  <label htmlFor="rn">Roll no.</label>
                  <input id="rn" type="text" autoComplete="off" placeholder="e.g. 26U030020" value={roll} onChange={(e) => setRoll(e.target.value)} />
                  <div className="err" id="e4">{err.roll}</div>
                </div>
                <div className="f">
                  <label htmlFor="pg">Program</label>
                  <select id="pg" value={program} onChange={(e) => setProgram(e.target.value)}>
                    <option value="" disabled>Select</option>
                    {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <div className="err" id="e5">{err.program}</div>
                </div>
              </div>
              <div className="row2">
                <div className="f">
                  <label htmlFor="yr">Year of study</label>
                  <select id="yr" value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="" disabled>Select</option>
                    {YEARS.map((y) => <option key={y}>{y}</option>)}
                  </select>
                  <div className="err" id="e6">{err.year}</div>
                </div>
                <div className="f">
                  <label htmlFor="wa">WhatsApp number</label>
                  <input id="wa" type="tel" autoComplete="tel" placeholder="e.g. 9135103078" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <div className="err" id="e7">{err.phone}</div>
                </div>
              </div>
              <div className="f">
                <label htmlFor="em">Email</label>
                <input id="em" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="err" id="e2">{err.email}</div>
              </div>
              <fieldset>
                <legend>Crew color</legend>
                <div className="sw" id="sw">
                  {COL.map((c, i) => (
                    <label key={i}>
                      <input type="radio" name="col" value={i} aria-label={NAMES[i]} checked={chosen === i} onChange={() => setChosen(i)} />
                      <Crewmate color={c} />
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="f">
                <label htmlFor="rl">Role you hope to get</label>
                <select id="rl" value={role} onChange={(e) => setRole(e.target.value)}>
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="chk">
                <input id="ag" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <label htmlFor="ag" style={{ font: "400 15px Inter" }}>I’ll join on time and play fair, even if I’m the impostor.</label>
              </div>
              <div className="err" id="e3" style={{ margin: "-14px 0 12px" }}>{err.agree}</div>
              <button className="btn pulse" type="submit">Save my seat</button>
            </form>
          ) : (
            <div className="done show" id="done">
              <Crewmate id="dcm" color={COL[chosen]} />
              <h3 id="dh" style={{ fontSize: 28 }}>{who + ", you’re on the crew!"}</h3>
              <div className="stamp">Registered successfully</div>
              <p>Your seat is saved. Check your inbox for the Discord link before 14 November.</p>
            </div>
          )}
        </Reveal>
      </div>
      {scene && <KillScene {...scene} onDone={() => finish(scene.name)} />}
    </section>
  );
}
