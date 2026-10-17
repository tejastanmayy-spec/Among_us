import Reveal from "./Reveal.jsx";
import EmergencyButton from "./EmergencyButton.jsx";

export default function Emergency() {
  return (
    <section className="meet" id="meeting">
      <div className="wrap">
        <Reveal as="h2">Seen something sus?</Reveal>
        <Reveal as="p" className="sub" style={{ marginInline: "auto" }}>Press the big red button. That’s how every good round starts.</Reveal>
        <Reveal className="tbl"><EmergencyButton /></Reveal>
      </div>
    </section>
  );
}
