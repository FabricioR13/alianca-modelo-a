import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { SERVICES, WHATSAPP } from "../data";
import { SectionTag, Star } from "./Decor";

const DURATION = 6000;

export default function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % SERVICES.length), DURATION);
    return () => clearTimeout(t);
  }, [active, paused, tick]);

  const select = (i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  };

  const onMove = (e: MouseEvent) => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 10 });
  };

  const s = SERVICES[active];

  return (
    <section id="terapias" className="relative overflow-hidden py-24 transition-colors duration-700 md:py-32" style={{ background: s.tint }}>
      <Star color={s.color} size={40} className="absolute right-[8%] top-16 animate-float opacity-70" />
      <Star color="#fbd684" size={26} className="absolute left-[5%] bottom-20 animate-float-slow" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionTag color="bg-aqua-dark">Nossas terapias</SectionTag>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Peças diferentes, <span className="relative whitespace-nowrap">um só propósito<svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 h-3 w-full" preserveAspectRatio="none"><path d="M2 8 Q 100 -2 198 8" stroke={s.color} strokeWidth="5" fill="none" strokeLinecap="round" style={{ transition: "stroke .6s" }} /></svg></span>
          </h2>
          <p className="mt-5 text-lg text-ink-soft">Um cuidado integrado, em que cada especialidade se encaixa para apoiar o desenvolvimento global da criança.</p>
        </div>

        <div
          className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* selector */}
          <div className="reveal grid grid-cols-2 gap-4">
            {SERVICES.map((sv, i) => {
              const on = i === active;
              return (
                <button
                  key={sv.id}
                  onClick={() => select(i)}
                  className={`group relative rounded-[1.75rem] p-5 text-left transition-all duration-500 ${
                    on ? "-translate-y-1 scale-[1.02] text-white shadow-2xl" : "bg-white text-ink shadow-sm hover:-translate-y-1 hover:shadow-lg"
                  }`}
                  style={on ? { background: sv.color, boxShadow: `0 25px 50px -20px ${sv.color}` } : undefined}
                >
                  {/* puzzle nubs */}
                  <span
                    className="absolute -right-3 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full transition-colors duration-500"
                    style={{ background: on ? sv.color : "#fff", display: i % 2 === 0 ? "block" : "none" }}
                  />
                  <span
                    className="absolute -bottom-3 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full transition-colors duration-500"
                    style={{ background: on ? sv.color : "#fff", display: i < 4 ? "block" : "none" }}
                  />
                  <span className={`relative z-10 grid h-12 w-12 place-items-center rounded-2xl text-2xl transition-transform duration-500 group-hover:rotate-12 ${on ? "bg-white/25" : ""}`} style={on ? undefined : { background: sv.tint }}>
                    {sv.icon}
                  </span>
                  <p className="relative z-10 mt-4 font-display text-lg font-semibold leading-tight md:text-xl">{sv.title}</p>
                  <p className={`relative z-10 mt-1 text-xs font-semibold md:text-sm ${on ? "text-white/85" : "text-ink-soft"}`}>{sv.short}</p>
                  {on && (
                    <span className="absolute inset-x-5 bottom-3 z-10 h-1 overflow-hidden rounded-full bg-white/30">
                      <span
                        key={`${active}-${tick}-${paused}`}
                        className="block h-full rounded-full bg-white"
                        style={{
                          animation: paused ? "none" : `grow ${DURATION}ms linear forwards`,
                          width: paused ? "100%" : undefined,
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div className="reveal" style={{ perspective: 1200 }}>
            <div
              ref={panelRef}
              onMouseMove={onMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              className="relative rounded-[2.5rem] bg-white p-4 shadow-2xl md:p-6"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform .3s ease-out", transformStyle: "preserve-3d" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                {SERVICES.map((sv, i) => (
                  <img
                    key={sv.id}
                    src={sv.photo}
                    alt={sv.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-1000"
                    style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.12)" }}
                  />
                ))}
                <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-lg transition-colors duration-500" style={{ background: s.color, transform: "translateZ(40px)" }}>
                  {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </div>
                <div className="absolute inset-x-6 bottom-5 text-white" style={{ transform: "translateZ(30px)" }}>
                  <h3 key={s.id} className="animate-pop font-display text-3xl font-semibold md:text-4xl">
                    {s.title}
                  </h3>
                </div>
              </div>

              <div key={s.id + "-body"} className="animate-pop px-2 pb-2 pt-6">
                <p className="text-lg leading-relaxed text-ink-soft">{s.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold" style={{ background: s.tint, color: s.color }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="group mt-6 inline-flex items-center gap-2 font-bold text-ink">
                  Quero saber mais sobre {s.title}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>

              {/* floating accent */}
              <div
                className="absolute -right-5 -top-5 hidden h-20 w-20 place-items-center rounded-3xl text-4xl shadow-xl md:grid animate-float"
                style={{ background: s.color, transform: "translateZ(60px)" }}
              >
                {s.icon}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes grow { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}
