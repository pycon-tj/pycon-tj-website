import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Speakers from "@/components/sections/Speakers";
import Heritage from "@/components/sections/Heritage";
import Venue from "@/components/sections/Venue";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

/**
 * Concise homepage. Detailed visitor information (schedule, workshops, numbers)
 * will move to its own pages; those section components remain in
 * components/sections (Schedule, Workshops, Highlights, Marquee) for that.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Speakers />
        <Heritage />
        <Venue />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
