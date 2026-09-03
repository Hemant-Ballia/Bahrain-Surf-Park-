import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ScrollFlyIn from "./components/ui/hero-section-3";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import About from "./sections/About";
import SurfJourney from "./components/SurfJourney";

import Features from "./components/Features";
import ImageBreak from "./components/ImageBreak";
import Gallery from "./components/Gallery";
import Stats from "./components/Stats";
import Events from "./components/Events";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  const [showWebsite, setShowWebsite] = useState(false);

  const handleExplore = () => {
    setShowWebsite(true);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 400);
  };

  return (
    <>
      <Navbar />

      <main>
        {!showWebsite && <ScrollFlyIn onExplore={handleExplore} />}

        <div id="main-content" className={!showWebsite ? "hidden" : "block"}>
          <Hero />
          <Intro />
          <About />
          <SurfJourney />
         
          <Features />
          {/* <ImageBreak /> */}
          <Gallery />
          <Stats />
          <Events />
          <CTA />
        </div>
      </main>

      {showWebsite && <Footer />}
    </>
  );
}

export default App;