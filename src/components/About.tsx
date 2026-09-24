import { useEffect, useMemo, useState } from "react";
import { buildGrid, seeded } from "../lib/puzzle";
import { useInView, useScrollProgress } from "../lib/hooks";
import { COLORS, PHOTOS } from "../data";
import { SectionTag, Star } from "./Decor";

const W = 600;
const H = 450;
const TINTS = [COLORS.lilac, COLORS.aqua, COLORS.coral, COLORS.sun];

function PuzzlePhoto() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(0.95, 0.4);
  const pieces = useMemo(() => buildGrid(4, 3, W, H, 23), []);
  const scatter = useMemo(() => {
    const r = seeded(99);
    return pieces.map((p) => {
      const ang = Math.atan2(p.cy - H / 2, p.cx - W / 2);
      const dist = 180 + r() * 180;
      return { dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist + (r() - 0.5) * 100, rot: (r() - 0.5) * 90 };
    });
  }, [pieces]);

  const e = 1 - Math.pow(1 - progress, 3);
  const done = progress > 0.98;

  return (
    <div ref={ref} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible drop-shadow-[0_30px_40px_rgba(139,79,130,0.25)]">
        <defs>
          {pieces.map((p, i) => (
            <clipPath id={`pp-${i}`} key={i}>
              <path d={p.d} />
            </clipPath>
          ))}
        </defs>
        {pieces.map((p, i) => {
          const s = scatter[i];
          const k = 1 - e;
          return (
            <g key={i} transform={`translate(${s.dx * k} ${s.dy * k}) rotate(${s.rot * k} ${p.cx} ${p.cy})`}>
              <g clipPath={`url(#pp-${i})`}>
                <image href={PHOTOS.reveal} x="0" y="0" width={W} height={H} preserveAspectRatio="xMidYMid slice" />
                <rect x="0" y="0" width={W} height={H} fill={TINTS[(p.r + p.c) % 4]} opacity={k * 0.85} />
              </g>
              <path d={p.d} fill="none" stroke="#fdf3e1" strokeWidth={done ? 1.5 : 4} strokeOpacity={done ? 0.5 : 1} style={{ transition: "all .6s" }} />
            </g>
          );
        })}
      </svg>
      <div
        className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 font-display text-lg font-semibold text-ink shadow-xl transition-all duration-500 ${
          done ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        Todas as peças encaixadas 💛
      </div>
      <div
        className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-xl font-semibold text-ink/60 transition-opacity duration-500 ${
          progress < 0.15 ? "opacity-100" : "opacity-0"
        }`}
      >
        role para encaixar as peças ↓
      </div>
    </div>
  );
}

function Counter({ to, suffix = "", label, color }: { to: number; suffix?: string; label: string; color: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <div ref={ref} className="group relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 transition-transform duration-500 group-hover:scale-150" style={{ background: color }} />
      <p className="relative font-display text-4xl font-bold text-ink">
        {n}
        {suffix}
      </p>
      <p className="relative mt-1 text-sm font-semibold text-ink-soft">{label}</p>
    </div>
  );
}

const TAGS = ["Autismo (TEA)", "TDAH", "Atraso de fala", "Seletividade alimentar", "Ansiedade infantil", "Dificuldade de aprendizagem", "Integração sensorial", "Habilidades sociais", "Síndrome de Down", "Regulação emocional"];
const TAG_COLORS = [COLORS.lilac, COLORS.aqua, COLORS.coral, COLORS.sun, COLORS.berry];

export function Marquee() {
  const items = [...TAGS, ...TAGS];
  return (
    <div className="relative -rotate-2 overflow-hidden bg-ink py-4 shadow-xl">
      <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-medium text-cream md:text-3xl">
            {t}
            <Star color={TAG_COLORS[i % TAG_COLORS.length]} size={26} />
          </span>
        ))}
      </div>
    </div>
  );
}

const VALUES = [
  { t: "Ciência", d: "Práticas baseadas em evidências e supervisão clínica contínua.", c: "bg-lilac-light", i: "🔬" },
  { t: "Afeto", d: "Vínculo e ludicidade são a base de todo aprendizado.", c: "bg-coral-light", i: "💛" },
  { t: "Família", d: "Pais e cuidadores são parte ativa da equipe terapêutica.", c: "bg-aqua-light", i: "🏡" },
  { t: "Inclusão", d: "Parceria com escolas para uma inclusão de verdade.", c: "bg-sun-light", i: "🤝" },
];

export default function About() {
  return (
    <section id="sobre" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
        <div className="reveal order-2 lg:order-1">
          <PuzzlePhoto />
        </div>

        <div className="order-1 lg:order-2">
          <div className="reveal">
            <SectionTag color="bg-coral">Sobre a Aliança</SectionTag>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Uma rede de cuidado onde <span className="text-lilac-dark">ninguém caminha sozinho</span>.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Acreditamos que o desenvolvimento acontece quando terapeutas, família e escola se encaixam como peças de um mesmo quebra-cabeça. Por isso, nossa equipe
              multidisciplinar trabalha de forma integrada, com planos individualizados e muito carinho.
            </p>
          </div>

          <div className="reveal mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.t} className={`group flex gap-3 rounded-2xl ${v.c} p-4 transition-all hover:-translate-y-1 hover:shadow-md`}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-xl shadow-sm transition-transform group-hover:rotate-12 group-hover:scale-110">{v.i}</span>
                <div>
                  <p className="font-display text-lg font-semibold">{v.t}</p>
                  <p className="text-sm leading-snug text-ink-soft">{v.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-8 grid grid-cols-3 gap-3">
            <Counter to={500} suffix="+" label="famílias atendidas" color={COLORS.lilac} />
            <Counter to={12} label="anos de experiência" color={COLORS.aqua} />
            <Counter to={30} suffix="+" label="especialistas" color={COLORS.coral} />
          </div>
        </div>
      </div>
    </section>
  );
}
