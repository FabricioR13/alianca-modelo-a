import { useEffect, useState } from "react";
import { WHATSAPP } from "../data";

export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 92" width={size} height={size * 0.92} aria-hidden>
      <defs>
        <clipPath id="logo-heart">
          <path d="M50 90 C 35 78, 2 60, 2 34 C 2 14, 16 3, 31 3 C 41 3, 47 9, 50 16 C 53 9, 59 3, 69 3 C 84 3, 98 14, 98 34 C 98 60, 65 78, 50 90 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#logo-heart)" stroke="#fdf3e1" strokeWidth="2.5">
        <rect x="0" y="0" width="50" height="46" fill="#f2956a" />
        <rect x="50" y="0" width="50" height="46" fill="#b377a8" />
        <rect x="0" y="46" width="50" height="46" fill="#9fe0e6" />
        <rect x="50" y="46" width="50" height="46" fill="#fbd684" />
        <circle cx="50" cy="30" r="7" fill="#b377a8" />
        <circle cx="30" cy="46" r="7" fill="#9fe0e6" />
        <circle cx="70" cy="46" r="7" fill="#b377a8" />
      </g>
      <circle cx="38" cy="36" r="4.5" fill="#2b2445" />
      <circle cx="62" cy="36" r="4.5" fill="#2b2445" />
      <path d="M40 50 Q50 60 60 50" stroke="#2b2445" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#terapias", label: "Terapias" },
  { href: "#jornada", label: "Como funciona" },
  { href: "#espaco", label: "Espaço" },
  { href: "#equipe", label: "Equipe" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6 ${
          scrolled ? "bg-white/80 shadow-[0_10px_40px_-15px_rgba(139,79,130,0.35)] ring-1 ring-ink/5 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110">
            <LogoMark />
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl font-bold tracking-tight text-ink">Aliança</span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-lilac-dark">Clínica Comportamental</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-4 py-2 text-[15px] font-bold text-ink-soft transition-colors hover:bg-lilac-light/60 hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contato"
            className="hidden rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-lg shadow-ink/20 transition-all hover:-translate-y-0.5 hover:bg-lilac-dark sm:inline-flex"
          >
            Agendar avaliação
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow ring-1 ring-ink/5 lg:hidden"
            aria-label="Abrir menu"
          >
            <div className="relative h-4 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all ${open ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-ink transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all ${open ? "top-2 -rotate-45" : "top-4"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* mobile */}
      <div
        className={`mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl bg-white/95 shadow-xl ring-1 ring-ink/5 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a onClick={() => setOpen(false)} href={l.href} className="block rounded-2xl px-4 py-3 font-bold text-ink hover:bg-cream">
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="block rounded-2xl bg-ink px-4 py-3 text-center font-bold text-white">
              Falar no WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
