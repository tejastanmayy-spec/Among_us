import TypingLine from "./TypingLine.jsx";
import Countdown from "./Countdown.jsx";
import HeroWindow from "./HeroWindow.jsx";
import Walkers from "./Walkers.jsx";

export default function Hero() {
  return (
    <div className="hero">
      <div className="wrap">
        <div>
          <div className="badge"><span className="dot"></span>Registration open · 40 seats</div>
          <h1>Emergency meeting: someone is <span className="gl" data-t="sus">sus</span>.</h1>
          <p className="lead">
            <b>Among Us Live Night</b> is a free online tournament. Join a lobby of ten, finish your tasks, and vote out the impostor. Two nights: Saturday 14 and Sunday 15 November 2026, from 7:00 PM IST.
          </p>
          <div className="chips"><span>Online</span><span>40 seats</span><span>2 days</span></div>
          <div className="cta">
            <a className="btn pulse" href="#register">Register your crew</a>
            <a className="btn alt" href="#schedule">See the schedule</a>
          </div>
          <TypingLine />
          <Countdown />
        </div>
        <HeroWindow />
      </div>
      <div className="hint">Tip: click a crewmate on the floor to eject them.</div>
      <Walkers />
    </div>
  );
}
