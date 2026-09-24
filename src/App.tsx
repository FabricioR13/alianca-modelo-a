import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About, { Marquee } from "./components/About";
import Services from "./components/Services";
import Journey from "./components/Journey";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Contact, { WhatsIcon } from "./components/Contact";
import Footer from "./components/Footer";
import ClickStars from "./components/ClickStars";
import { useGlobalReveal, useMouse } from "./lib/hooks";
import { WHATSAPP } from "./data";

export default function App() {
  const mouse = useMouse();
  useGlobalReveal();

  return (
    <div className="relative">
      <ClickStars />
      <Navbar />
      <main>
        <Hero mouse={mouse} />
        <div className="relative z-10 -my-6 py-6">
          <Marquee />
        </div>
        <About />
        <Services />
        <Journey />
        <Gallery />
        <Team />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />

      {/* floating WhatsApp */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-2xl shadow-[#25D366]/40 transition-all hover:-translate-y-1 hover:pr-6"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <WhatsIcon className="h-7 w-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold transition-all duration-500 group-hover:max-w-40">Fale conosco</span>
      </a>
    </div>
  );
}
