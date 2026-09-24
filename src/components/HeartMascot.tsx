import { useEffect, useMemo, useRef, useState } from "react";
import { buildGrid, seeded } from "../lib/puzzle";
import { COLORS } from "../data";
import { STAR_PATH } from "./Decor";

const HEART =
  "M210 385 C 150 340, 20 262, 18 150 C 16 78, 70 28, 132 30 C 172 32, 196 56, 210 82 C 224 56, 248 32, 288 30 C 350 28, 404 78, 402 150 C 400 262, 270 340, 210 385 Z";

const { lilac, aqua, coral, sun } = COLORS;
const GRID_COLORS = [
  [coral, lilac, sun, aqua],
  [sun, aqua, lilac, coral],
  [lilac, coral, aqua, sun],
  ["#e9c46a", coral, lilac, aqua],
];

const WORDS = [
  "Afeto", "Ciência", "Família", "Inclusão",
  "Respeito", "Escuta", "Brincar", "Autonomia",
  "Comunicação", "Parceria", "Paciência", "Evolução",
  "Acolhimento", "Alegria", "Cuidado", "Aliança",
];

type Props = {
  mouse: { cx: number; cy: number };
  className?: string;
};

export default function HeartMascot({ mouse, className = "" }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [assembled, setAssembled] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const [hug, setHug] = useState(false);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  const pieces = useMemo(() => buildGrid(4, 4, 400, 360, 11, 10, 28), []);
  const scatter = useMemo(() => {
    const r = seeded(42);
    return pieces.map(() => ({
      dx: (r() - 0.5) * 520,
      dy: (r() - 0.5) * 420,
      rot: (r() - 0.5) * 140,
    }));
  }, [pieces]);

  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), 250);
    const t2 = setTimeout(() => setSettled(true), 2600);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  // eyes follow cursor
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || (mouse.cx === 0 && mouse.cy === 0)) return;
    const rect = svg.getBoundingClientRect();
    const ex = rect.left + rect.width * 0.5;
    const ey = rect.top + rect.height * 0.42;
    const dx = mouse.cx - ex;
    const dy = mouse.cy - ey;
    const dist = Math.hypot(dx, dy) || 1;
    const k = Math.min(1, dist / 300) * 7;
    setPupil({ x: (dx / dist) * k, y: (dy / dist) * k });
  }, [mouse.cx, mouse.cy]);

  const onHeartClick = () => {
    setHug(true);
    setTimeout(() => setHug(false), 700);
  };

  return (
    <div className={`relative select-none ${className}`}>
      <svg
        ref={svgRef}
        viewBox="-70 -40 560 480"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Coração feito de peças de quebra-cabeça sorrindo — símbolo da Aliança"
      >
        <defs>
          <clipPath id="heart-clip">
            <path d={HEART} />
          </clipPath>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#8b4f82" floodOpacity="0.22" />
          </filter>
          <path id="orbit-path" d="M -40 215 A 250 120 0 1 1 460 215 A 250 120 0 1 1 -40 215" />
        </defs>

        {/* dashed orbit (back) */}
        <g transform="rotate(-14 210 215)">
          <use href="#orbit-path" fill="none" stroke="#2b2445" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="7 9" />
        </g>

        {/* heart */}
        <g
          filter="url(#soft-shadow)"
          style={{
            transformOrigin: "210px 210px",
            transform: hug ? "scale(1.07)" : "scale(1)",
            transition: "transform .5s cubic-bezier(.34,1.56,.64,1)",
            cursor: "pointer",
          }}
          onClick={onHeartClick}
        >
          {pieces.map((p, i) => {
            const s = scatter[i];
            const isHover = hovered === i;
            const transform = assembled
              ? isHover
                ? "translate(0px,-8px) scale(1.05)"
                : "translate(0px,0px) rotate(0deg)"
              : `translate(${s.dx}px, ${s.dy}px) rotate(${s.rot}deg)`;
            return (
              <g
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  transformOrigin: `${p.cx}px ${p.cy}px`,
                  transform,
                  opacity: assembled ? 1 : 0,
                  transition: settled
                    ? "transform .35s cubic-bezier(.34,1.56,.64,1)"
                    : `transform 1.3s cubic-bezier(.34,1.4,.64,1) ${i * 55}ms, opacity .6s ease ${i * 55}ms`,
                }}
              >
                <g clipPath="url(#heart-clip)">
                  <path d={p.d} fill={GRID_COLORS[p.r][p.c]} stroke="#fdf3e1" strokeWidth="3.5" strokeLinejoin="round" />
                  {/* inner shade */}
                  <path d={p.d} fill="#000" opacity={p.r >= 2 ? 0.06 : 0} />
                </g>
              </g>
            );
          })}

          {/* gloss */}
          <g clipPath="url(#heart-clip)" pointerEvents="none">
            <ellipse cx="110" cy="110" rx="70" ry="45" fill="#fff" opacity="0.22" transform="rotate(-30 110 110)" />
            <path d="M40 300 Q 210 420 380 300 L 400 400 L 20 400 Z" fill="#000" opacity="0.06" />
          </g>

          {/* face */}
          <g
            pointerEvents="none"
            style={{ opacity: assembled ? 1 : 0, transition: "opacity .6s ease 1.2s" }}
          >
            {[168, 252].map((x) => (
              <g key={x}>
                {/* lashes */}
                <path d={`M${x - 8} 128 l-3 -10 M${x} 124 v-11 M${x + 8} 128 l3 -10`} stroke="#2b2445" strokeWidth="3" strokeLinecap="round" />
                <g className="eye-blink">
                  <circle cx={x} cy="152" r="23" fill="#fff" />
                  <circle cx={x + pupil.x} cy={152 + pupil.y} r="15" fill="#2b2445" />
                  <circle cx={x + pupil.x + 5} cy={152 + pupil.y - 6} r="5" fill="#fff" />
                  <circle cx={x + pupil.x - 5} cy={152 + pupil.y + 5} r="2.2" fill="#fff" opacity="0.8" />
                </g>
              </g>
            ))}
            <ellipse cx="128" cy="192" rx="17" ry="10" fill={hug ? "#e8577a" : "#f2956a"} opacity="0.9" style={{ transition: "fill .3s" }} />
            <ellipse cx="292" cy="192" rx="17" ry="10" fill={hug ? "#e8577a" : "#f2956a"} opacity="0.9" style={{ transition: "fill .3s" }} />
            <path
              d={hug ? "M180 188 Q210 232 240 188 Z" : "M182 190 Q210 222 238 190"}
              fill={hug ? "#2b2445" : "none"}
              stroke="#2b2445"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* arms */}
          <g pointerEvents="none" style={{ opacity: assembled ? 1 : 0, transition: "opacity .6s ease 1.4s" }}>
            <g>
              <path d="M40 330 Q 80 300 120 262" stroke="#fff" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="124" cy="256" r="15" fill="#fff" />
              <path d="M124 243 l4 -12 M134 248 l9 -8 M138 259 l12 -3 M113 246 l-2 -12" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
            </g>
            <g className="arm-wave" style={{ transformOrigin: "100% 100%" }}>
              <path d="M380 330 Q 340 300 300 262" stroke="#fff" strokeWidth="20" strokeLinecap="round" fill="none" />
              <circle cx="296" cy="256" r="15" fill="#fff" />
              <path d="M296 243 l-4 -12 M286 248 l-9 -8 M282 259 l-12 -3 M307 246 l2 -12" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* orbit stars (front) */}
        <g transform="rotate(-14 210 215)" pointerEvents="none">
          {[
            { c: "#9fe0e6", s: 1.9, b: "0s" },
            { c: "#f0613e", s: 1.3, b: "-5s" },
            { c: "#d4467c", s: 1.2, b: "-10s" },
            { c: "#fbd684", s: 1.4, b: "-15s" },
          ].map((st, i) => (
            <g key={i}>
              <animateMotion dur="22s" repeatCount="indefinite" begin={st.b}>
                <mpath href="#orbit-path" />
              </animateMotion>
              <g transform={`scale(${st.s}) translate(-12 -12)`}>
                <path d={STAR_PATH} fill={st.c} />
              </g>
            </g>
          ))}
        </g>
      </svg>

      {/* word bubble */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-center">
        <div
          className={`rounded-full bg-white px-5 py-2 font-display text-lg font-semibold text-ink shadow-lg ring-1 ring-ink/5 transition-all duration-300 ${
            hovered !== null ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Esta peça é <span className="text-lilac">{hovered !== null ? WORDS[hovered] : ""}</span> ✨
        </div>
      </div>
    </div>
  );
}
