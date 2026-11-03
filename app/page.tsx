import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Footer } from "@/components/layout/Footer";
import { Mascot } from "@/components/layout/Mascot";
import { Navbar } from "@/components/layout/Navbar";
import { SideRail } from "@/components/layout/SideRail";
import { ThemeControl } from "@/components/layout/ThemeControl";

export default function Home() {
  return (
    <>
      <div id="top" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />

        {/* Experience + Skills sit side by side on desktop, as in the reference mockup */}
        <div className="wrap">
          <div className="grid border-t border-line-subtle lg:grid-cols-2">
            <Experience />
            <Skills />
          </div>
        </div>
        <Contact />
      </main>
      <Footer />

      {/* Fixed, viewport-level elements */}
      <ThemeControl />
      <SideRail />
      <Mascot />
    </>
  );
}
