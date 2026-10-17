import { RM } from "../lib/motion.js";
import { confetti, siren } from "../lib/fx.js";
import { useFx } from "../lib/FxContext.jsx";

// Red flash, banner, screen shake, siren and confetti. When the 2.4s animation ends, scroll to the register block.
export default function EmergencyButton() {
  const { meeting } = useFx();

  function press() {
    meeting();
    if (!RM) {
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 2100);
    }
    siren();
    confetti(["#F45858"], 40);
    setTimeout(() => {
      const reg = document.getElementById("register");
      if (reg) reg.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" });
    }, 2400);
  }

  return (
    <button className="red" id="red" type="button" onClick={press}>
      EMERGENCY<br />MEETING
    </button>
  );
}
