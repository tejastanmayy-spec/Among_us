const TEXT = "\u00A0\u00A0Red is sus \u2605 Vote them out \u2605 Fix the wiring \u2605 Trust no one \u2605".repeat(12);

export default function Marquee() {
  return (
    <div className="mq" aria-hidden="true">
      <div id="mq">{TEXT}</div>
    </div>
  );
}
