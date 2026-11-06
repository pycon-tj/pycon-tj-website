import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import Speakers from "@/components/sections/Speakers";
import Schedule from "@/components/sections/Schedule";
import Workshops from "@/components/sections/Workshops";
import Heritage from "@/components/sections/Heritage";
import Venue from "@/components/sections/Venue";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* The Hero is a night scene in both themes. */}
        <div className="dark-island">
          <Hero />
        </div>
        <Marquee />
        <About />
        <Highlights />
        <Speakers />
        <Schedule />
        <Workshops />
        <Heritage />
        <Venue />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
