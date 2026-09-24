import { useEffect, useRef, useState } from "react";
import { STEPS } from "../data";
import { useScrollProgress } from "../lib/hooks";
import { SectionTag, STAR_PATH } from "./Decor";

const NODES: [number, number][] = [
  [120, 150],
  [360, 70],
  [600, 165],
  [840, 70],
  [1080, 150],
];

function catmull(points: [number, number][]) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const PATH = catmull([[0, 170], ...NODES, [1200, 130]]);

export default function Journey() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(0.8, 0.25);
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [head, setHead] = useState({ x: 0, y: 170 });

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (!pathRef.current || !len) return;
    const pt = pathRef.current.getPointAtLength(progress * len);
    setHead({ x: pt.x, y: pt.y });
  }, [progress, len]);

  const activeCount = NODES.filter(([x]) => head.x >= x - 4).length;

  return (
    <section id="jornada" className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-lilac/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-aqua/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="[&>span]:bg-white/10 [&>span]:text-cream [&>span]:ring-white/10">
              <SectionTag color="bg-sun">Como funciona</SectionTag>
            </div>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Uma jornada construída <span className="text-sun">passo a passo</span>, com vocês.
            </h2>
          </div>
          <p className="max-w-sm text-lg text-cream/70">Do primeiro contato às grandes conquistas, acompanhamos cada etapa com transparência e afeto.</p>
        </div>

        <div ref={ref} className="mt-16">
          {/* desktop path */}
          <div className="relative hidden md:block">
            <svg viewBox="0 0 1200 240" className="w-full overflow-visible">
              <path d={PATH} fill="none" stroke="#fdf3e1" strokeOpacity="0.25" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" />
              <path
                ref={pathRef}
                d={PATH}
                fill="none"
                stroke="url(#journey-grad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={len || 1}
                strokeDashoffset={(len || 1) * (1 - progress)}
              />
              <defs>
                <linearGradient id="journey-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="#9fe0e6" />
                  <stop offset="0.3" stopColor="#fbd684" />
                  <stop offset="0.55" stopColor="#f2956a" />
                  <stop offset="0.8" stopColor="#b377a8" />
                  <stop offset="1" stopColor="#d4467c" />
                </linearGradient>
              </defs>
              {NODES.map(([x, y], i) => {
                const on = i < activeCount;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={on ? 30 : 22} fill={on ? STEPS[i].color : "#2b2445"} stroke={on ? "#fdf3e1" : "rgba(253,243,225,.35)"} strokeWidth="3" style={{ transition: "all .5s cubic-bezier(.34,1.56,.64,1)" }} />
                    <text x={x} y={y + 7} textAnchor="middle" className="font-display" fontSize="20" fontWeight="700" fill={on ? "#2b2445" : "#fdf3e1"}>
                      {i + 1}
                    </text>
                  </g>
                );
              })}
              {len > 0 && progress > 0.01 && (
                <g transform={`translate(${head.x} ${head.y}) rotate(${progress * 720}) scale(1.6) translate(-12 -12)`}>
                  <path d={STAR_PATH} fill="#fbd684" />
                </g>
              )}
            </svg>

            <div className="mt-6 grid grid-cols-5 gap-5">
              {STEPS.map((st, i) => {
                const on = i < activeCount;
                return (
                  <div
                    key={st.title}
                    className={`rounded-3xl p-5 transition-all duration-700 ${on ? "translate-y-0 bg-white/10 opacity-100" : "translate-y-4 bg-white/[0.03] opacity-40"}`}
                    style={on ? { boxShadow: `inset 0 3px 0 ${st.color}` } : undefined}
                  >
                    <p className="font-display text-xl font-semibold" style={{ color: on ? st.color : undefined }}>
                      {st.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-cream/75">{st.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* mobile */}
          <div className="relative md:hidden">
            <div className="absolute bottom-4 left-[22px] top-4 w-1 rounded-full bg-white/10" />
            <div className="absolute left-[22px] top-4 w-1 rounded-full bg-linear-to-b from-aqua via-coral to-lilac" style={{ height: `calc(${progress * 100}% - 2rem)` }} />
            <ol className="space-y-6">
              {STEPS.map((st, i) => {
                const on = progress >= i / STEPS.length;
                return (
                  <li key={st.title} className="relative flex gap-5">
                    <span
                      className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] font-display text-lg font-bold transition-all duration-500"
                      style={{ background: on ? st.color : "#2b2445", borderColor: on ? "#fdf3e1" : "rgba(253,243,225,.3)", color: on ? "#2b2445" : "#fdf3e1" }}
                    >
                      {i + 1}
                    </span>
                    <div className={`rounded-3xl bg-white/5 p-5 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-50"}`}>
                      <p className="font-display text-xl font-semibold" style={{ color: st.color }}>
                        {st.title}
                      </p>
                      <p className="mt-1 text-sm text-cream/75">{st.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
