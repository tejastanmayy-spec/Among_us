import { useCallback, useEffect, useState } from "react";
import { FxProvider } from "./lib/FxContext.jsx";
import { ripple } from "./lib/fx.js";
import { RevealProvider } from "./components/Reveal.jsx";
import { CrewmateSprite } from "./components/Crewmate.jsx";
import StarField from "./components/StarField.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import SmallTasks from "./components/SmallTasks.jsx";
import Schedule from "./components/Schedule.jsx";
import Finale from "./components/Finale.jsx";
import Emergency from "./components/Emergency.jsx";
import Register from "./components/Register.jsx";
import Blackout from "./components/Blackout.jsx";
import DevLog from "./components/DevLog.jsx";
import Footer from "./components/Footer.jsx";
import ClickWords from "./components/ClickWords.jsx";
import PetCursor from "./components/PetCursor.jsx";

export default function App() {
  const [blackout, setBlackout] = useState(false);
  const openBlackout = useCallback(() => setBlackout(true), []);
  const closeBlackout = useCallback(() => setBlackout(false), []);

  // Button ripple for every .btn on the page.
  useEffect(() => {
    document.addEventListener("click", ripple);
    return () => document.removeEventListener("click", ripple);
  }, []);

  return (
    <FxProvider>
      <RevealProvider>
        <CrewmateSprite />
        <StarField />
        <ClickWords />
        <PetCursor />
        <ScrollProgress />
        <Navbar />
        <main id="top">
          <Hero />
          <Marquee />
          <About />
          <SmallTasks />
          <Schedule />
          <Finale onBlackout={openBlackout} />
          <Emergency />
          <Register />
        </main>
        <Blackout open={blackout} onClose={closeBlackout} />
        <DevLog />
        <Footer />
      </RevealProvider>
    </FxProvider>
  );
}
